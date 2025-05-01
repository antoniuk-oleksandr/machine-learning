import { z } from "zod";

export const testingFormSchema = z.object({
  gridSize: z.number({ message: 'Grid size is required and must be a number' }).min(8, { message: 'Grid size must be greater than 7' }),
  weightsFile: z.instanceof(File, { message: 'Weights file is required and must be a file' }),
  pixels: z.array(z.number(), { message: 'Testing value is required' })
})
