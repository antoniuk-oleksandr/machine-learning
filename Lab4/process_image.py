import cv2
import numpy as np


def process_image(image_path):
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    if img is not None:
        resized = cv2.resize(img, (128, 128), interpolation=cv2.INTER_NEAREST)
        normalized = resized.astype(np.float32) * (1/255)
        return normalized.flatten() 
    return None
