import { z } from "zod";
import type { MyInputProps } from "../../../../types/MyInputProps";
import type { LearningError } from "../../../../types/LearningError";

export const getTaskOneTestModalInputs = (errors: any): MyInputProps[] => [
  {
    name: 'bias',
    class: 'col-span-3',
    label: 'Bias value',
    placeholder: 'Enter bias value',
    error: errors.bias?.[0]
  },
  {
    name: 'weights.0',
    label: 'w1',
    placeholder: '0.0',
    error: findTaskOneModalWeightsError(errors.weights)
  },
  {
    name: 'weights.1',
    label: 'w2',
    placeholder: '0.0',
    error: findTaskOneModalWeightsError(errors.weights)
  },
  {
    name: 'weights.2',
    label: 'w3',
    placeholder: '0.0',
    error: findTaskOneModalWeightsError(errors.weights)
  },
  {
    name: 'learningValue.x1',
    label: 'x1',
    placeholder: '0.0',
    error: errors.learningValue?.x1?.[0]
  },
  {
    name: 'learningValue.x2',
    label: 'x2',
    placeholder: '0.0',
    error: errors.learningValue?.x2?.[0]
  },
  {
    name: 'learningValue.classValue',
    label: 'Class',
    placeholder: '1/-1',
    error: errors.learningValue?.classValue?.[0]
  },
]


export const findTaskOneModalLearningError = (error: LearningError | null): string => {
  if (!error) return '';

  const possibleErrors = Object.values(error).find((err) => err !== null)
  return possibleErrors ? possibleErrors[0] : ''
}

export const findTaskOneModalWeightsError = (error: any): string | undefined => {
  if (!error) return undefined;

  if (typeof error === 'string') return error;

  if (Array.isArray(error)) {
    for (const item of error) {
      if (typeof item === 'object' && item !== null) {
        const nestedErrors = Object.values(item).find(
          (val) => Array.isArray(val) && val.length > 0
        );
        //@ts-ignore
        if (nestedErrors) return nestedErrors[0];
      }

      if (typeof item === 'string') return item;
    }
  }

  return undefined;
};


export const taskOneTestModalFormSchema = z.object({
  bias: z.number({ message: "Bias value is required and should be a number" }),
  weights: z.array(z.number({ message: "Weights value is required and should be an array of numbers" })).length(3),
  learningValue: z.object({
    x1: z.number({ message: 'x1 value is required and should be a number' }),
    x2: z.number({ message: 'x2 value is required and should be a number' }),
    classValue: z
      .number({ message: 'Class value is required and should be either -1 or 1' })
      .refine((val) => val === 1 || val === -1, {
        message: 'Class value must be either -1 or 1',
      }),
  })
})
