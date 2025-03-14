import { ChatOllama } from "@langchain/ollama";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { tools } from "./tools";
import { message2 } from "./messages";

const newPrompt = "I bought 4 eggs that each one was cost 1 euro. How much do they cost in total?";

const callLLM = async (prompt: string) => {
  const llm = new ChatOllama({
    model: "llama3.1:latest",
    baseUrl: "http://localhost:11434",
    temperature: 1,
  });

  const llmWithTools = llm.bindTools(tools);

  const messages = [
    new SystemMessage(message2),
    new HumanMessage(prompt),
  ];

  const response = await llmWithTools.invoke(messages);

  const toolsByName = {
    addTwoNumbers: tools[0],
    subtracktTwoNumbers: tools[1],
    multiplyTwoNumbers: tools[2],
    divideTwoNumbers: tools[3],
  };

  if (response.tool_calls) {
    for (const toolCall of response.tool_calls) {
      const selectedTool = toolsByName[toolCall.name as keyof typeof toolsByName];
      const toolMessage = await selectedTool.invoke(toolCall);
      console.log(`Calling the ${toolCall.name} tool`);
      messages.push(toolMessage);
    }
  } 

  const finalResponse = await llmWithTools.invoke(messages);
  console.log(finalResponse.content);
};

callLLM(newPrompt);
