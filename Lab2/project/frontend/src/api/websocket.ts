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

  websocket.onmessage = (event) => {
    console.log('Message from server:', event.data);
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
