import { z } from "zod";

export const wishlistSchema = z.object({
    jewelleryId: z.string().min(1, "Jewellery ID is required"),
});
