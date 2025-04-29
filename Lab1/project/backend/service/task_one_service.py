import asyncio
import json
from body.task_one_test import TaskOneTest
from body.task_one_input import TaskOneInput
from helpers.task_one_helpers import next_epoch, test_perceptron, train_step_by_step, train_with_delay, train_without_delay
from fastapi import WebSocketDisconnect  # type: ignore
from enums.message_type import TaskOneMessageType
from locks import user_locks


async def handle_task_one(websocket):
    try:
        while True:
            raw_data = await websocket.receive_text()
            body = json.loads(raw_data)
            message_data = body.get('data')
            response = None

            match body.get("type"):
                case TaskOneMessageType.TRAIN_ALL_WITHOUT_DELAY:
                    parsed_data = TaskOneInput.parse_obj(message_data)
                    response = await train_without_delay(parsed_data, websocket)
                case TaskOneMessageType.TRAIN_WITH_DELAY:
                    delay = body.get("delay")
                    parsed_data = TaskOneInput.parse_obj(message_data)
                    response = await train_with_delay(parsed_data, websocket, delay)
                case TaskOneMessageType.TRAIN_STEP_BY_STEP:
                    parsed_data = TaskOneInput.parse_obj(message_data)
                    asyncio.create_task(
                        train_step_by_step(parsed_data, websocket)
                    )
                case TaskOneMessageType.NEXT_EPOCH:
                    await next_epoch(websocket)
                case TaskOneMessageType.TEST_MODEL:
                    parsed_data = TaskOneTest.parse_obj(message_data)
                    response = test_perceptron(parsed_data)

            if response is not None:
                await websocket.send_json(response)
    except WebSocketDisconnect:
        user_id = id(websocket)
        if user_id in user_locks:
            del user_locks[user_id]
    except Exception as e:
        print(f"Error: {e}")
