import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import dotenv from "dotenv";
import { tools } from "../api";
import { FunctionCall } from "../types";
import { weatherPrompt } from "./messages";

// Load environment variables from .env file
dotenv.config();

/**
 * Asynchronously interacts with Google's Generative AI to provide weather-based advice.
 * Uses the Gemini 2.0 Flash model to process a prompt and retrieve weather data for a specified city.
 * @returns {Promise<void>} Resolves when the AI response is logged or an error message is displayed.
 */
const calGemini = async (): Promise<void> => {
  // Initialize the Google Generative AI instance with an API key from environment variables
  const genAI = process.env.LLM_API
    ? new GoogleGenerativeAI(process.env.LLM_API)
    : undefined;

  // Configure the generative model with a specific model, system instructions, and tools
  const model = genAI
    ? genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction: weatherPrompt, // Predefined instruction for weather-related queries
        tools: [
          {
            functionDeclarations: [
              {
                name: "retrieveTheWeather",
                parameters: {
                  type: SchemaType.OBJECT,
                  description: "Searches and gets weather data",
                  properties: {
                    a: {
                      type: SchemaType.STRING,
                      description:
                        "The city name for which weather data is retrieved. Must be a string.",
                    },
                  },
                  required: ["a"],
                },
              },
            ],
          },
        ],
      })
    : undefined;

  // Proceed only if the model is successfully initialized
  if (model) {
    const chat = model.startChat(); // Start a chat session with the model
    const prompt = "Im going to LA to day what should i get with me?"; // User prompt

    // Send the prompt to the model and await the response
    const result = await chat.sendMessage(prompt);

    // Extract any function calls from the response
    const functionInArray = result.response.functionCalls();
    const cleanFunction: FunctionCall | undefined = functionInArray
      ? functionInArray[0]
      : undefined;

    if (cleanFunction) {
      // Call the corresponding tool function with the provided arguments
      const apiResponse = await tools[cleanFunction.name as keyof typeof tools](
        cleanFunction.args
      );
      // Send the tool's response back to the chat session
      const sendResponse = await chat.sendMessage([
        {
          functionResponse: {
            name: "retrieveTheWeather",
            response: apiResponse ? apiResponse : {},
          },
        },
      ]);
      console.log(sendResponse.response.text()); // Log the final AI response
    } else {
      console.log(result.response.text()); // Log the response if no function was called
    }
  } else {
    console.log("Couldn't connect to API"); // Log an error if model initialization fails
  }
};

// Execute the function
calGemini();