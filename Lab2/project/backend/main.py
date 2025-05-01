from service.service import process_training_request
from fastapi import FastAPI, APIRouter, WebSocket  # type: ignore

app = FastAPI()
router = APIRouter(prefix='/api/v1')


@router.websocket("/")
async def handle_training_request(websocket: WebSocket):
    await websocket.accept()
    return await process_training_request(websocket)

app.include_router(router)
