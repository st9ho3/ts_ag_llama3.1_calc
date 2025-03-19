import { ChatOllama } from "@langchain/ollama";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { tools } from "./tools";
import { weatherPrompt } from "./messages";

/**
 * User prompt defining a sequence of financial transactions to calculate remaining money.
 */
const newPrompt = "I had initially 10$. I bought an apple for 2$. I bought a banana for 1$. My brother gave me 2$. Last I bought an orange for 3$. How much money do I have?";

/**
 * Asynchronously invokes the ChatOllama language model to process a prompt and return a response.
 * Supports tool calls for calculations or external data retrieval.
 * @param {string} prompt - The user input prompt to process.
 * @returns {Promise<void>} Resolves when the final response is logged to the console.
 */
const callLLM = async (prompt: string): Promise<void> => {
  // Initialize the ChatOllama model with specific configuration
  const llm = new ChatOllama({
    model: "qwen2.5:7b", // Model identifier for Ollama
    baseUrl: "http://localhost:11434", // Local server URL for Ollama
    temperature: 1, // Controls randomness of the model's output (1 = default creativity)
  });

  // Bind predefined tools to the model for extended functionality
  const llmWithTools = llm.bindTools(tools);

  // Construct message array with system and human prompts
  const messages = [
    new SystemMessage(weatherPrompt), // System instruction (likely unrelated to money calculation here)
    new HumanMessage(prompt), // User-provided prompt
  ];

  // Invoke the model with the initial messages and await response
  const response = await llmWithTools.invoke(messages);

  // Map tool names to their implementations for easy lookup
  const toolsByName = {
    addTwoNumbers: tools[0],
    subtracktTwoNumbers: tools[1], // Note: Typo in original code ("subtrackt" instead of "subtract")
    multiplyTwoNumbers: tools[2],
    divideTwoNumbers: tools[3],
    getWeather: tools[4],
  };

  // Process any tool calls returned by the model
  if (response.tool_calls) {
    for (const toolCall of response.tool_calls) {
      const selectedTool = toolsByName[toolCall.name as keyof typeof toolsByName];
      const toolMessage = await selectedTool.invoke(toolCall); // Execute the tool with its arguments
      console.log(`Calling the ${toolCall.name} tool...`);
      messages.push(toolMessage); // Add tool output to the message history
    }
  }

  // Re-invoke the model with updated messages and log the final response
  const finalResponse = await llmWithTools.invoke(messages);
  console.log(finalResponse.content);
};

// Execute the function with the predefined prompt
callLLM(newPrompt);