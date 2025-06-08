import { z } from "zod"

export const createUserSchema = z.object({
    userName: z.string().min(3).max(30),
    passWord: z.string().min(4).max(40),
    name:z.string().min(3).max(50)
});

export const signinSchema = z.object({
    userName: z.string().min(3).max(30),
    passWord: z.string().min(4).max(40)
});

export const createRoomSchema = z.object({
    name: z.string().min(3).max(25)
});