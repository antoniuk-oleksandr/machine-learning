import { z } from "zod";
import type { MyInputProps } from "../../../../../../types/MyInputProps";

export const taskTwoAddPointModalFormSchema = z.object({
  x: z.number({ message: "X value is required" }),
  y: z.number({ message: "Y value is required" }),
})

export const getTaskTwoPointModalInputs = (formErrors: Record<string, string[]>): MyInputProps[] => [
  {
    id: 'x',
    name: 'x',
    label: 'x value',
    placeholder: 'Enter x value',
    error: formErrors.x && formErrors.x[0],
  },
  {
    id: 'y',
    name: 'y',
    label: 'y value',
    placeholder: 'Enter x value',
    error: formErrors.y && formErrors.y[0],
  },
]
