import type { Writable } from "svelte/store"
import type { TestingFormData } from "../../types/TestingFormData"
import { getJsonFromFile } from "../TrainingPage/helpers"
import { sendWebSocketMessage } from "../../api/websocket"
import type { TestingRequestBody } from "../../types/TestingRequestBody"
import { MessageType } from "../../types/MessageType"

export const handleFileSelect = (
  files: FileList,
  formDataStore: Writable<TestingFormData>
) => {
  formDataStore.update((prev) => ({
    ...prev,
    weightsFile: files[0]
  }))
}

export const handleTestingFormSubmit = async (data: TestingFormData) => {
  const weights = await getJsonFromFile<number[][]>(data.weightsFile)

  const wsBody: TestingRequestBody = {
    type: MessageType.Testing,
    data: {
      weights,
      gridSize: data.gridSize,
      pixels: data.pixels,
    }
  }

  sendWebSocketMessage<TestingRequestBody>(wsBody);
}
