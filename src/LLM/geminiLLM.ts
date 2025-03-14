import {  GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import dotenv from 'dotenv'
import { getWeather, tools } from "../api";
import { FunctionCall } from "../types";
import { instruction, systemMessage } from "./messages";

dotenv.config()

const calGemini = async(): Promise<void> => {
const genAI = process.env.LLM_API ?  new GoogleGenerativeAI(process.env.LLM_API) : undefined
const model = 
    genAI ? genAI.getGenerativeModel(
    { 
        model: "gemini-2.0-flash",
        systemInstruction: instruction, 
        tools: [{
            functionDeclarations: [
                {
                    name: 'retrieveTheWeather',
                    parameters: {
                        type: SchemaType.OBJECT,
                        description: 'Searches and gets weather data',
                        properties: {
                            a: {
                                type: SchemaType.STRING,
                                description: 'the city name for which we make the research. needs to pass as a string'
                            }
                        },
                        required: ['a']
                    }
                }
            ]
        }]
        
    }) 
    : undefined



if (model) {
    const chat = model.startChat();
    const prompt = "how are you?"
    
    const result = await chat.sendMessage(prompt)

    const functionInArray = result.response.functionCalls()
    const cleanFunction: FunctionCall = functionInArray ? functionInArray[0] : undefined

    if (cleanFunction ) {
        const apiResponse = await tools[cleanFunction.name as keyof typeof tools](cleanFunction.args)
        const sendResponse = await chat.sendMessage([{functionResponse: {
            name: 'retrieveTheWeather',
            response: apiResponse ? apiResponse : {}
        }}])
        console.log(sendResponse.response.text())
    }
    
} else {
    console.log("Couldn't connect to API");

}}

calGemini()