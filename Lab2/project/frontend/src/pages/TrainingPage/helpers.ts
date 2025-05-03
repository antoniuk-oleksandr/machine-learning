import { z } from "zod";
import type { LearningValue } from "../../types/LearningValue";
import type { MyInputProps } from "../../types/MyInputProps";

export const getTrainingFormInputs = (errors: Record<string, string[]>): MyInputProps[] => [
  {
    name: 'cValue',
    placeholder: 'Enter the learning rate value',
    label: 'C Value',
    error: errors.cValue && errors.cValue[0],
    subText: 'Regulation parameter',
  },
  {
    name: 'gridSize',
    placeholder: 'Enter grid size',
    label: 'Grid Size',
    error: errors.gridSize && errors.gridSize[0],
    subText: 'Number of grid divisions',
  },
  {
    name: 'accuracy',
    placeholder: 'Enter accuracy value',
    label: 'Accuracy',
    error: errors.accuracy && errors.accuracy[0],
    subText: 'Accuracy of the model',
  },
]

export const trainingFormSchema = z.object({
  cValue: z.number({ message: 'C value is required and must be a number' }),
  gridSize: z.number({ message: 'Grid size is required and must be a number' }),
  learningValuesFiles: z.instanceof(FileList, { message: 'Learning values file is required' }),
  accuracy: z.number({ message: 'Accuracy is required and must be a number' }),
})

export const getJsonFromFile = async <T>(file: File): Promise<T> => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = () => {
      try {
        const jsonObject = JSON.parse(reader.result as string);
        resolve(jsonObject);
      } catch (error) {
        reject(new Error("Invalid JSON file"));
      }
    };
    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };
    reader.readAsText(file);
  });
}
