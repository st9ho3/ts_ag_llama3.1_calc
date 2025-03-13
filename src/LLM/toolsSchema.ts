import { z } from "zod";

const addInputSchema = z.object({
    a: z.number(),
    b: z.number()
})
const subtracktInputSchema = z.object({
    a: z.number(),
    b: z.number()
})
const multiplyInputSchema = z.object({
    a: z.number(),
    b: z.number()
})
const divideInputSchema = z.object({
    a: z.number(),
    b: z.number()
})