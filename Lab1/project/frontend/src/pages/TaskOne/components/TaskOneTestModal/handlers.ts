import { sendWebSocketMessage } from "../../../../api/websocket";
import type { TaskOneTrainFormData } from "../../../../types/TaskOneTrainFormData";
import { TrainingType } from "../../../../types/TrainingType";
import { taskOneTestModalStore } from "../../stores/task-one-test-modal-store";

export const handleTaskOneTestModalSubmit = (data: TaskOneTrainFormData) => {
  
  const wsBody = {
    data,
    type: TrainingType.TestModel
  }
  
  sendWebSocketMessage(wsBody)
  taskOneTestModalStore.update((prev) => ({ ...prev, open: false }));
}
