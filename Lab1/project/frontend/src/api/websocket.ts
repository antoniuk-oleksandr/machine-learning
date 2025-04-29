import { taskOneChartStore } from "../pages/TaskOne/stores/task-one-chart-store";
import { taskOneEpochResultStore } from "../pages/TaskOne/stores/task-one-epoch-result-store";
import { taskOneSettingsStore } from "../pages/TaskOne/stores/task-one-settings-store";
import { taskOneTestResultStore } from "../pages/TaskOne/stores/task-one-test-result-store";
import { taskOneTrainStore } from "../pages/TaskOne/stores/task-one-train-store";
import type { TaskOneEpochResult } from "../types/TaskOneEpochResult";
import type { TaskOneResponse } from "../types/TaskOneResponse";
import { WebsocketMessageType } from "../types/WebsocketMessageType";
import { getHost, getWSHost } from "../utils/utils";

let socket: WebSocket | null = null;

const handleEpochResult = (data: TaskOneEpochResult) => {
  taskOneEpochResultStore.update((prev) => [...prev, data]);
}

const handleTrainResult = (data: any) => {
  taskOneChartStore.set({ k: data.k, b: data.b });
  taskOneSettingsStore.update((prev) => ({ ...prev, trained: true, training: false }));
  taskOneTrainStore.update((prev) => ({ ...prev, weights: data.weights }))
}

const handleTestResult = (data: any) => {
  taskOneTestResultStore.set({
    success: data.success,
    open: true,
  })
}

const handleWebsocketMessage = (event: MessageEvent<any>) => {
  const response: TaskOneResponse = JSON.parse(event.data);

  switch (response.websocketMessageType) {
    case WebsocketMessageType.EpochResult:
      handleEpochResult(response.data);
      break;
    case WebsocketMessageType.TrainingResult:
      handleTrainResult(response.data);
      break;
    case WebsocketMessageType.TestResult:
      handleTestResult(response.data);
      break;
  }
}

export const connectToWebSocket = (url: string) => {
  const host = getWSHost();
  url = `${host}/api/v1${url}`;

  socket = new WebSocket(url);

  socket.onmessage = handleWebsocketMessage
}

export const disconnectFromWebSocket = () => {
  if (!socket) return;

  socket.close();
  socket = null;
}

export const sendWebSocketMessage = async <T>(data: T) => {
  if (!socket || socket.readyState !== WebSocket.OPEN) return
  socket?.send(JSON.stringify(data));
};

