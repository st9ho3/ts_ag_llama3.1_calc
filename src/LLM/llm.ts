import  {tool} from "@langchain/core/tools"
import {ChatOllama} from "@langchain/ollama"
import { defaultTextSplitter, HumanMessage } from "@langchain/core/messages";
import { addTwoNumbers } from "./tools";

const calLLM = async(prompt: string): Promise<void> => {
  const llm = new ChatOllama( {
    model: 'llama3.2:latest',
    baseUrl:'http://localhost:11434',
    temperature: 0

  } )

    const response = await llm.invoke(prompt)
    console.log(response.content)
}

calLLM('Hello there. whats the capital of germany?')


