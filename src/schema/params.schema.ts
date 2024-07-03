import { z } from "zod";

export const ParamsSchema = z.string(
     z.string().regex(/^\d+$/, "Invalid ID format"), // Example validation for numeric ID
  );