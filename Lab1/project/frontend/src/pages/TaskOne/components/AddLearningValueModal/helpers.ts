import { z } from "zod"
import type { MyInputProps } from "../../../../types/MyInputProps"

export const getAddLearningValueModalInputsData = (): MyInputProps[] => [
  {
    name: 'x1',
    id: 'x1-input',
    placeholder: 'Enter x1 value',
    label: 'x1 value',
    type: 'number',
  },
  {
    name: 'x2',
    id: 'x2-input',
    placeholder: 'Enter x2 value',
    label: 'x2 value',
    type: 'number',
  },
  {
    name: 'classValue',
    id: 'class-input',
    placeholder: 'Enter class value',
    label: 'Class value',
    type: 'number',
  },
]

export const addLearningValueModalSchema = z.object({
  x1: z.number({ message: 'x1 value is required and should be a number' }),
  x2: z.number({ message: 'x2 value is required and should be a number' }),
  classValue: z
    .number({ message: 'Class value is required and should be either -1 or 1' })
    .refine((val) => val === 1 || val === -1, {
      message: 'Class value must be either -1 or 1',
    }),
});
