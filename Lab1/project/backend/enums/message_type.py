from enum import IntEnum, auto


class TaskOneMessageType(IntEnum):
    TRAIN_ALL_WITHOUT_DELAY = auto()
    TRAIN_WITH_DELAY = auto()
    TRAIN_STEP_BY_STEP = auto()
    NEXT_EPOCH = auto()
    EPOCH_RESULT = auto()
    TEST_MODEL = auto()
