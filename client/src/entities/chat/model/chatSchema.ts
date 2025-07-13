import { z } from "zod"

export const chatSchema = z.object({
    id: z.number(),
    userId: z.number().nullable().optional(),
    guestId: z.string().nullable().optional(),
    lastActivityAt: z.string().datetime().optional().nullable(),
})

export const newChatSchema = z.object({
    userId: z.number().nullable().optional(),
    guestId: z.string().nullable().optional(),
})

export const messageSchema = z.object({
    id: z.number().optional(),
    chatId: z.number(),
    sender: z.string(),
    content: z.string(),
})

export const newMessageSchema = z.object({
    chatId: z.number(),
    sender: z.string(),
    content: z.string(),
})