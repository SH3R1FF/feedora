import {z} from "zod"

export const messageSchema = z.object(
    {
        content: z
            .string()
            .min(10, {message: "Content must have at least 10 characters"})
            .max(300, {message: "Content must be less than  300 characters"}),
        

        username: z.string(),
            
    }
)