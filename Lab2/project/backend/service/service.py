import json
from models.testing_body import TestingBody
from training import DigitClassifier
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
                    classifier = DigitClassifier(
                        parsed_data.c_value,
                        parsed_data.e_value,
                        parsed_data.accuracy,
                        parsed_data.learning_values,
                        parsed_data.grid_size
                    )
                    weights = classifier.train()

                    response = {
                        "type": MessageType.TRAINING_RESULT,
                        "data": {
                            "weights": weights
                        }
                    }
                case MessageType.TESTING:
                    parsed_data = TestingBody.parse_obj(message_data)
                    classifier = DigitClassifier(
                        weights=parsed_data.weights,
                        grid_size=parsed_data.grid_size,
                    )
                    result_number = classifier.test(parsed_data.pixels)

                    response = {
                        "type": MessageType.TESTING_RESULT,
                        "data": {
                            "resultNumber": result_number
                        }
                    }

            if response != None:
                await websocket.send_text(json.dumps(response))
    except WebSocketDisconnect:
        print("WebSocket disconnected")
    except Exception as e:
        print(f"Error: {e}")
