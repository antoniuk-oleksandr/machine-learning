import asyncio
from enums.websocket_message_type import WebsocketMessageType
from body.task_one_input import TaskOneInput
from perceptron import Perceptron
from locks import user_locks


async def send_message(epoch, weights, result, websocket):
    await websocket.send_json({
        "websocketMessageType": WebsocketMessageType.EPOCH_RESULT,
        "data": {
            "epoch": epoch,
            "weights": weights,
            "result": result
        }
    })


async def train_without_delay(parsed_data, websocket):
    async def on_iteration(epoch, weights, result, _):
        await send_message(epoch, weights, result, websocket)

    return await train_perceptron(parsed_data, on_iteration)


async def train_with_delay(parsed_data, websocket, delay):
    async def on_iteration(epoch, weights, result, fails):
        await send_message(epoch, weights, result, websocket)

        if fails != 0:
            await asyncio.sleep(delay)

    return await train_perceptron(parsed_data, on_iteration)


async def train_step_by_step(parsed_data, websocket):
    user_id = id(websocket)

    lock = asyncio.Lock()
    user_locks[user_id] = lock

    async def on_iteration(epoch, weights, result, _):
        await lock.acquire()
        await send_message(epoch, weights, result, websocket)

    response = await train_perceptron(parsed_data, on_iteration)
    await websocket.send_json(response)


async def next_epoch(websocket):
    user_id = id(websocket)
    lock = user_locks.get(user_id)

    if lock and lock.locked():
        lock.release()
    else:
        raise ValueError(
            "No lock found for the user or lock already released.")


async def train_perceptron(data: TaskOneInput, on_iteration):
    perceptron = Perceptron(
        data.bias,
        data.weights,
        data.learningValues,
        data.learningRateCoefficient
    )

    weights = await perceptron.train(on_iteration)
    k, b = perceptron.get_separator_line()

    return {
        "websocketMessageType": WebsocketMessageType.TRAINING_RESULT,
        "data": {
            "weights": weights,
            "k": k,
            "b": b,
        }
    }


def test_perceptron(data: TaskOneInput):
    perceptron = Perceptron(
        data.bias,
        data.weights,
        [data.learningValue],
        None
    )
    success = perceptron.test_model()

    return {
        "websocketMessageType": WebsocketMessageType.TEST_RESULT,
        "data": {
            "success": success
        }
    }
