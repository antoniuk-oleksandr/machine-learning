import type { Writable } from "svelte/store";
import { sendWebSocketMessage } from "../../api/websocket";
import { MessageType } from "../../types/MessageType";
import type { TrainingFormData } from "../../types/TrainingFormData";
import type { TrainingRequestBody } from "../../types/TrainingRequestBody";
import { getJsonFromFile } from "./helpers";
import type { LearningValue } from "../../types/LearningValue";

export const handleFileSelect = (
  files: FileList,
  formDataStore: Writable<TrainingFormData>
) => {
  formDataStore.update((prev) => ({
    ...prev,
    learningValuesFiles: files
  }))
}

export const handleTrainingFormSubmit = async (formData: TrainingFormData) => {
  const learningValues = await getJsonFromFile<LearningValue[]>(formData.learningValuesFiles[0]);

  const { learningValuesFiles, ...rest } = formData;

  const wsBody: TrainingRequestBody = {
    type: MessageType.Training,
    data: { ...rest, learningValues }
  }

  sendWebSocketMessage<TrainingRequestBody>(wsBody);
}

export const handleDownloadWeightsButtonClick = (weights: number[][]) => {
  const blob = new Blob([JSON.stringify(weights)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "weights.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
