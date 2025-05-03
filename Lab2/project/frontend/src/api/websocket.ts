import { weightsStore } from "../common-stores/weights-store";
import { testingResultStore } from "../pages/TestingPage/stores/testing-result-store";
import { epochsStore } from "../pages/TrainingPage/stores/epochs-store";
import type { EpochData } from "../types/EpochData";
import { MessageType } from "../types/MessageType";
import type { TestingResult } from "../types/TestingResult";

let websocket: WebSocket | null = null;

export const connectWebSocket = (partURL: string) => {
  const url = `ws://localhost:8000${partURL}`;

  if (websocket) {
    websocket.close();
  }

  websocket = new WebSocket(url);

  websocket.onopen = () => {
    console.log('WebSocket connection opened');
  };

  websocket.onclose = () => {
    console.log('WebSocket connection closed');
  }

  websocket.onmessage = (event) => {
    const response = JSON.parse(event.data);

    switch (response.type) {
      case MessageType.TrainingResult:
        handleTrainingResult(response.data);
        break;
      case MessageType.TestingResult:
        handleTestingResult(response.data);
        break;
      case MessageType.Epoch:
        handleEpoch(response.data)
        break;
      default:
        console.log('Unknown message type');
    }
  };
}

export const disconnectWebSocket = () => {
  if (websocket) {
    websocket.close();
    websocket = null;
    console.log('WebSocket connection closed');
  }
}

export const sendWebSocketMessage = <T>(message: T) => {
  websocket?.send(JSON.stringify(message));
}

const handleEpoch = (data: EpochData) => {
  epochsStore.update((prev) => [...prev, data])
}

const handleTrainingResult = (data: any) => {
  weightsStore.set(data.weights);
}

const handleTestingResult = (data: TestingResult) => {
  console.log('Testing result:', data);
  testingResultStore.set({ open: true, ...data })
}
