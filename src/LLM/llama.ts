import { ChatOllama } from "@langchain/ollama";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { tools } from "./tools";
import { weatherPrompt } from "./messages";


const newPrompt = "Im going to LA to day what should i get with me?";

const callLLM = async (prompt: string) => {
  const llm = new ChatOllama({
    model: "llama3.1:latest",
    baseUrl: "http://localhost:11434",
    temperature: 1,
  });

  const llmWithTools = llm.bindTools(tools);
  
//These are the messages one the prompt and one for the system prompt
  const messages = [
    new SystemMessage(weatherPrompt),
    new HumanMessage(prompt),
  ];

  const response = await llmWithTools.invoke(messages);

//We can change the tool here
  const toolsByName = {
    addTwoNumbers: tools[0],
    subtracktTwoNumbers: tools[1],
    multiplyTwoNumbers: tools[2],
    divideTwoNumbers: tools[3],
    getWeather: tools[4]
  };

 /*  const externalTools = {
    getWeatherData: apiTools[0]
  } */

  if (response.tool_calls) {
    for (const toolCall of response.tool_calls) {
      const selectedTool = toolsByName[toolCall.name as keyof typeof toolsByName];
      const toolMessage = await selectedTool.invoke(toolCall);
      console.log(`Calling the ${toolCall.name} tool...`);
      messages.push(toolMessage);
    }
  } 

  const finalResponse = await llmWithTools.invoke(messages);
  console.log(finalResponse.content);
};

callLLM(newPrompt);
