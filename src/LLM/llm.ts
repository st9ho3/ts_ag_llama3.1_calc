import {ChatOllama} from "@langchain/ollama"
import {  HumanMessage, SystemMessage } from "@langchain/core/messages";
import { tools } from "./tools";
import { systemMessage, message2 } from "./messages";


const newPrompt: string = "What's up bro?"  /* 'I go to the supermarket and buy on small cup for 5$. Atfter i go in grocceries and buy another bag with veggies for 6$. How much did i spend? '  */

const callLLM = async(prompt: string): Promise<void> => {
   const llm = new ChatOllama( {
    model: 'llama3.1:latest',
    baseUrl:'http://localhost:11434',
    temperature: 1

  } ) 
  const llmWithTools = llm.bindTools(tools) 

  const messages = [

    new SystemMessage(message2),

    new HumanMessage(prompt)
  ]

  const response = await llmWithTools.invoke(messages)


  if (response) {
    console.log(response.tool_calls?.length)
    console.log(response.content)
    console.log(response)
  } else {
    console.log("Couldn't invoke anything.")
  }

  const toolsByName = {
    addTwoNumbers: tools[0],
    subtracktTwoNumbers: tools[1],
    multiplyTwoNumbers: tools[2],
    divideTwoNumbers: tools[3]
  }

  response.tool_calls?.forEach(async(tool) => {
    const theTool = tool.name as keyof typeof toolsByName; // Type assertion here    const selectedTool: any = toolsByName.theTool
    const selectedTool = toolsByName[theTool]
    const toolMessage = await selectedTool.invoke(tool) 
    messages.push(toolMessage)

  } )
}

callLLM(newPrompt)


