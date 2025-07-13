import type { z } from 'zod';
import type { chatSchema, messageSchema, newChatSchema, newMessageSchema } from './chatSchema';

export type ChatT = z.infer<typeof chatSchema>;
export type NewChatT = z.infer<typeof newChatSchema>;
export type MessageT = z.infer<typeof messageSchema>;
export type NewMessageT = z.infer<typeof newMessageSchema>;

export type ChatSliceT = {
    allChats: ChatT[],
    chat: ChatT | null,
    messages: MessageT[],
    isLoading: boolean,
    error: string | null,
}