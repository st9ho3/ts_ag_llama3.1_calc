import { Numbers } from "../types";
import { z } from "zod";
import { tool } from "@langchain/core/tools";
import { getWeather } from "../api";

/**
 * Asynchronously adds two numbers.
 * @param {Numbers} params - Object containing two numbers, 'a' and 'b'.
 * @returns {Promise<number>} The sum of 'a' and 'b'.
 */
const addTwoNumbers = async ({ a, b }: Numbers): Promise<number> => {
  return a + b;
};

// Schema for validating input to addTwoNumbers
const addInputSchema = z.object({
  a: z.number().describe("The first number to add"),
  b: z.number().describe("The second number to add"),
});

// Tool definition for addTwoNumbers
const addTwoNumbersTool = tool(addTwoNumbers, {
  name: "addTwoNumbers",
  schema: addInputSchema,
  description: "This tool takes two numbers 'a' and 'b' as input and returns their sum.",
});

/**
 * Asynchronously subtracts one number from another.
 * @param {Numbers} params - Object containing two numbers, 'a' and 'b'.
 * @returns {Promise<number>} The result of subtracting 'b' from 'a'.
 */
const subTracktNumbers = async ({ a, b }: Numbers): Promise<number> => {
  return a - b;
};

// Schema for validating input to subTracktNumbers
const subtracktInputSchema = z.object({
  a: z.number().describe("The number to subtract from"),
  b: z.number().describe("The number to subtract"),
});

// Tool definition for subTracktNumbers
const subtracktTwoNumbersTool = tool(subTracktNumbers, {
  name: "subtracktTwoNumbers", // Note: Typo in name ("subtrackt" instead of "subtract")
  schema: subtracktInputSchema,
  description: "This tool takes two numbers 'a' and 'b' as input and returns the result of subtracting 'b' from 'a'.",
});

/**
 * Asynchronously multiplies two numbers.
 * @param {Numbers} params - Object containing two numbers, 'a' and 'b'.
 * @returns {Promise<number>} The product of 'a' and 'b'.
 */
const multiplyTwoNumbers = async ({ a, b }: Numbers): Promise<number> => {
  return a * b;
};

// Schema for validating input to multiplyTwoNumbers
const multiplyInputSchema = z.object({
  a: z.number().describe("The first number to multiply"),
  b: z.number().describe("The second number to multiply"),
});

// Tool definition for multiplyTwoNumbers
const multiplyTwoNumbersTool = tool(multiplyTwoNumbers, {
  name: "multiplyTwoNumbers",
  schema: multiplyInputSchema,
  description: "This tool takes two numbers 'a' and 'b' as input and returns their product.",
});

/**
 * Asynchronously divides one number by another.
 * @param {Numbers} params - Object containing two numbers, 'a' and 'b'.
 * @returns {Promise<number>} The result of dividing 'a' by 'b'.
 */
const divideTwoNumbers = async ({ a, b }: Numbers): Promise<number> => {
  return a / b;
};

// Schema for validating input to divideTwoNumbers
const divideInputSchema = z.object({
  a: z.number().describe("The dividend"),
  b: z.number().describe("The divisor"),
});

// Tool definition for divideTwoNumbers
const divideTwoNumbersTool = tool(divideTwoNumbers, {
  name: "divideTwoNumbers",
  schema: divideInputSchema,
  description: "This tool takes two numbers 'a' and 'b' as input and returns the result of dividing 'a' by 'b'.",
});

// Schema for validating input to getWeather
const getWeatherSchema = z.object({
  a: z.string().describe("The name of the city to retrieve weather data for"),
});

// Tool definition for getWeather
const getWeatherTooll = tool(getWeather, {
  name: "getWeather",
  schema: getWeatherSchema,
  description:
    "This tool provides real-time weather information for a specified city. By accepting a city name as input, it queries a weather API endpoint to retrieve current conditions such as temperature, humidity, wind speed, and weather description (clear, cloudy, etc.).",
});

// Export array of API-specific tools
export const apiTools = [getWeatherTooll];

// Export array of all tools
export const tools = [
  addTwoNumbersTool,
  subtracktTwoNumbersTool,
  multiplyTwoNumbersTool,
  divideTwoNumbersTool,
  getWeatherTooll,
];