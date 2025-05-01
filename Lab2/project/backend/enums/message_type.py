from enum import IntEnum, auto


class MessageType(IntEnum):
    TRAINING = auto()
    TESTING = auto()
    TRAINING_RESULT = auto()
    TESTING_RESULT = auto()
