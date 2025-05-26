from typing import Any, Mapping
import numpy as np
from werkzeug.datastructures import FileStorage
from model_training import FungusClassifier
from process_image import preprocess_internet_image, transform_image_for_model


def handle_fungus_classify(
    image: FileStorage,
    training_params: tuple[np.ndarray, np.ndarray, np.ndarray, np.ndarray],
    output_classes: list[str]
) -> Mapping[str, float]:
    w1, w2, b1, b2 = training_params
    classifier = FungusClassifier(
        hidden_layer_size=128,
        learning_rate=0.001,
        output_values=output_classes,
        lambda_value=0.5,
        w1=w1,
        w2=w2,
        b1=b1,
        b2=b2,
    )

    input_vector = transform_image_for_model(image)
    if input_vector is None:
        raise ValueError("Failed to process image")

    return classifier.test_image(input_vector)
