import { z } from "zod";

export const contactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(), // Phone is optional in schema based on usage, adjust if strict
    message: z.string().min(1, "Message is required"),
});
