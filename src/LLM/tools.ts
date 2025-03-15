import { Numbers } from "../types";
import { z } from "zod";
import { tool } from "@langchain/core/tools";
import { getWeather } from "../api";

// Function to add two numbers
const addTwoNumbers = async ({ a, b }: Numbers): Promise<number> => {
  return a + b;
};

// Schema for addTwoNumbers
const addInputSchema = z.object({
  a: z.number(),
  b: z.number(),
});

// Tool for addTwoNumbers
const addTwoNumbersTool = tool(
  addTwoNumbers, 
  {
  name: "addTwoNumbers",
  schema: addInputSchema,
  description: "This tool takes two numbers 'a' and 'b' as input and returns their sum.",
});

// Function to subtract two numbers
const subTracktNumbers = async ({ a, b }: Numbers): Promise<number> => {
  return a - b;
};

// Schema for subTracktNumbers
const subtracktInputSchema = z.object({
  a: z.number(),
  b: z.number(),
});

// Tool for subTracktNumbers
const subtracktTwoNumbersTool = tool(subTracktNumbers, {
  name: "subtracktTwoNumbers",
  schema: subtracktInputSchema,
  description: "This tool takes two numbers 'a' and 'b' as input and returns the result of subtracting 'b' from 'a'.",
});

// Function to multiply two numbers
const multiplyTwoNumbers = async ({ a, b }: Numbers): Promise<number> => {
  return a * b;
};

// Schema for multiplyTwoNumbers
const multiplyInputSchema = z.object({
  a: z.number(),
  b: z.number(),
});

// Tool for multiplyTwoNumbers
const multiplyTwoNumbersTool = tool(multiplyTwoNumbers, {
  name: "multiplyTwoNumbers",
  schema: multiplyInputSchema,
  description: "This tool takes two numbers 'a' and 'b' as input and returns their product.",
});

// Function to divide two numbers
const divideTwoNumbers = async ({ a, b }: Numbers): Promise<number> => {
  return a / b;
};

// Schema for divideTwoNumbers
const divideInputSchema = z.object({
  a: z.number(),
  b: z.number(),
});

// Tool for divideTwoNumbers
const divideTwoNumbersTool = tool(divideTwoNumbers, {
  name: "divideTwoNumbers",
  schema: divideInputSchema,
  description: "This tool takes two numbers 'a' and 'b' as input and returns the result of dividing 'a' by 'b'.",
});

const getWeatherSchema = z.object(
  {a: z.string()}
)

const getWeatherTooll = tool(getWeather, {
  name: "getWeather",
  schema: getWeatherSchema,
  description: "This tool is built to provide real-time weather information for a specified city. By accepting a city name as input, the function queries a weather API endpoint to retrieve current conditions such as temperature, humidity, wind speed, and weather description (clear, cloudy, etc.). "
   
})

export const apiTools = [
  getWeatherTooll
]

export const tools = [
    addTwoNumbersTool,
    subtracktTwoNumbersTool,
    multiplyTwoNumbersTool,
    divideTwoNumbersTool,
    getWeatherTooll
]

