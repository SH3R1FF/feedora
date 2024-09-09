import {z} from "zod"

export const usernameValidation = z
    .string()
    .min(2, "Username must have atleast 2 characters")
    .max(10, "Username must be less than 10 characters")
    .regex(/^[a-zA-z0-9_]+$/, "Username must not contain special character")

export const signUpSchema = z.object({

    username: usernameValidation,
    email: z
        .string()
        .email({message: "Invalid email address"}),
    password: z
        .string()
        .min(6, {message: "Passowrd must have atleast 6 characters"})    
})
    
