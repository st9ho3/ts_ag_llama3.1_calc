import { Numbers } from "../types"

const addTwoNumbers = async ({a,b}: Numbers): Promise<void> => {
    a + b
}
const subTracktNumbes = async ({a,b}: Numbers): Promise<void> => {
    a - b
}
const multiplyTwoNumbers = async ({a,b}: Numbers): Promise<void> => {
    a + b
}
const divideTwoNumbers = async ({a,b}: Numbers): Promise<void> => {
    a + b
}

export {
    addTwoNumbers,
    subTracktNumbes,
    multiplyTwoNumbers,
    divideTwoNumbers
}
