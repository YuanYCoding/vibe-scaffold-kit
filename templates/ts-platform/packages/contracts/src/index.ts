import { z } from "zod";

export const healthResponseSchema = z.object({ status: z.literal("ok"), service: z.string() });
export type HealthResponse = z.infer<typeof healthResponseSchema>;

export const createTaskSchema = z.object({ title: z.string().trim().min(1).max(200) });
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
