import { z } from "zod";
import type { MyInputProps } from "../../types/MyInputProps";

export const testingFormSchema = z.object({
  gridSize: z.number({ message: 'Grid size is required and must be a number' }).min(8, { message: 'Grid size must be greater than 7' }),
  pointSize: z.number({ message: 'Brush size is required and must be a number' }).min(1, { message: 'Brush size must be greater than 0' }),
  weightsFile: z.instanceof(File, { message: 'Weights file is required and must be a file' }),
  pixels: z.array(z.number(), { message: 'Testing value is required' })
})

export const getTestingFormInputs = (
  formErrors: Record<string, string[]>
): MyInputProps[] => [
    {
      subText: "Number of grid divisions",
      placeholder: "Enter grid size",
      label: "Grid Size",
      error: formErrors.gridSize && formErrors.gridSize[0],
      name: "gridSize",
    },
    {
      subText: "Brush size",
      placeholder: "Enter brush size",
      label: "Brush Size",
      error: formErrors.pointSize && formErrors.pointSize[0],
      name: "pointSize",
    },
  ] 
