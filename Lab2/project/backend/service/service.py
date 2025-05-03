import json
from helpers.helpers import test_digit_classifier, train_digit_classifier
from models.testing_body import TestingBody
from models.training_body import TrainingBody
from enums.message_type import MessageType
from fastapi import WebSocket, WebSocketDisconnect  # type: ignore


async def process_training_request(websocket: WebSocket):
    try:
        while True:
            raw_data = await websocket.receive_text()
            body = json.loads(raw_data)
            message_data = body.get('data')

            response = None

            match body.get("type"):
                case MessageType.TRAINING:
                    parsed_data = TrainingBody.parse_obj(message_data)
                    response = await train_digit_classifier(parsed_data, websocket)
                case MessageType.TESTING:
                    parsed_data = TestingBody.parse_obj(message_data)
                    response = await test_digit_classifier(parsed_data)

            if response != None:
                await websocket.send_text(json.dumps(response))
    except WebSocketDisconnect:
        print("WebSocket disconnected")
    except Exception as e:
        print(f"Error: {e}")
