import random
import cv2
import numpy as np
from werkzeug.datastructures import FileStorage



def process_image(image_path, augment=True):
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        return None

    # Augmentation (only during training)
    if augment:
        # Random brightness/contrast
        img = cv2.convertScaleAbs(img, alpha=random.uniform(
            0.8, 1.2), beta=random.uniform(-10, 10))
        # Random rotation
        angle = random.uniform(-15, 15)
        M = cv2.getRotationMatrix2D((64, 64), angle, 1)
        img = cv2.warpAffine(img, M, (128, 128))

    img = cv2.resize(img, (128, 128))
    return (img / 255.0).flatten()


def preprocess_internet_image(image_path):
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)  # Force grayscale
    img = cv2.resize(img, (128, 128))
    img = cv2.GaussianBlur(img, (3, 3), 0)  # Reduce noise
    return (img / 255.0).flatten()

def transform_image_for_model(image: FileStorage) -> np.ndarray | None:
    img = cv2.imdecode(np.frombuffer(image.read(), np.uint8), cv2.IMREAD_GRAYSCALE)
    if img is None:
        return None

    img = cv2.resize(img, (128, 128))
    img = cv2.GaussianBlur(img, (3, 3), 0)
    return (img / 255.0).flatten()

