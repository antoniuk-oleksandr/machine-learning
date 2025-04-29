from enum import IntEnum, auto


class WebsocketMessageType (IntEnum):
    EPOCH_RESULT = auto()
    TRAINING_RESULT = auto()
    TEST_RESULT = auto()
