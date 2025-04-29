from service.task_two_service import handle_task_two
from body.task_two_body import TaskTwoBody
from fastapi import FastAPI, APIRouter, WebSocket # type: ignore
from service.task_one_service import handle_task_one

app = FastAPI()
router = APIRouter(prefix="/api/v1")


@router.websocket("/task/1")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    await handle_task_one(websocket)


@router.post("/task/2")
async def get_task_two(body: TaskTwoBody):
    return handle_task_two(body)

app.include_router(router)
