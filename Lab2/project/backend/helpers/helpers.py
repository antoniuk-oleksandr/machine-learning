import asyncio
from models.testing_body import TestingBody
from enums.message_type import MessageType
from training import DigitClassifier
from models.training_body import TrainingBody
from fastapi import WebSocket  # type: ignore


async def send_message(epoch_data, websocket):
    await websocket.send_json({
        "type": MessageType.EPOCH,
        "data": epoch_data,
    })


async def train_digit_classifier(body_data: TrainingBody, websocket: WebSocket):
    def on_epoch(epoch_data):
        asyncio.run(
            websocket.send_json({
                "type": MessageType.EPOCH,
                "data": epoch_data,
            })
        )

    classifier = DigitClassifier(
        c_value=body_data.c_value,
        accuracy=body_data.accuracy,
        learning_values=body_data.learning_values,
        grid_size=body_data.grid_size,
    )
    weights = await asyncio.to_thread(
        classifier.train,
        on_epoch=on_epoch
    )

    return {
        "type": MessageType.TRAINING_RESULT,
        "data": {
            "weights": weights,
        }
    }

async def test_digit_classifier(body_data: TestingBody):
    classifier = DigitClassifier(
        weights=body_data.weights,
        grid_size=body_data.grid_size,
    )
    softmax = classifier.test(body_data.pixels)

    return {
        "type": MessageType.TESTING_RESULT,
        "data": {
            "softmax": softmax
        }
    }
