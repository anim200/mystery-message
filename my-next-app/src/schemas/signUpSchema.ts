import { use } from 'react'
import {z} from 'zod'
export const usernameValidation = z
    .string()
    .min(2,"Username must be atleast 2 characters")
    .max(20,"username must be no more than 20 characters")
    .regex(/^[a-zA-Z0-9._]+$/, "Username must contain only alphanumeric characters, periods, and underscores");


export const signUpSchema =z.object({
    username: usernameValidation,
    email: z.string().email({message: 'Invalid Email Address'}),
    password: z.string().min(6,{message:"passowrd must be atleast 6 characters"})
})

