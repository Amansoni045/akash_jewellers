import { z } from "zod";

export const jewellerySchema = z.object({
    name: z.string().min(1, "Name is required"),
    category: z.string().optional().default(""),
    price: z.coerce.number().min(0, "Price must be positive"),
    weight: z.coerce.number().min(0, "Weight must be positive"),
    makingCharges: z.coerce.number().min(0).optional().default(0),
    gst: z.coerce.number().min(0).optional().default(3.0),
    discount: z.coerce.number().min(0).optional().default(0),
    description: z.string().optional().nullable(),
    image: z.string().url("Invalid image URL").optional().nullable(),
});

export const jewelleryUpdateSchema = jewellerySchema.partial();
