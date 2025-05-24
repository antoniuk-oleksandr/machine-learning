import csv
import numpy as np  # type: ignore

import pandas as pd  # type: ignore

from convert_images import convert_images, get_training_names
from model_training import FungiClassifier
from process_image import process_image
from visualize_vector import visualize_all, visualize_vector

HIDDEN_LAYER_SIZE = 128
OUTPUT_LAYER_SIZE = 10


import csv
import numpy as np
from typing import List, Tuple
import sys

def load_training_data(file_path: str) -> List[Tuple[int, np.ndarray]]:
    training_data = []

    # Count total rows for progress tracking
    with open(file_path, "r") as file:
        total_lines = sum(1 for _ in file)

    with open(file_path, "r") as file:
        reader = csv.reader(file)
        for i, row in enumerate(reader):
            fungi_index = int(row[0])
            input_vector = list(map(float, row[1:]))
            vector = np.array(input_vector).reshape(-1, 1)

            training_data.append((fungi_index, vector))

            # Show progress every 5%
            if i % max(1, total_lines // 20) == 0 or i == total_lines - 1:
                percent = (i + 1) / total_lines * 100
                sys.stdout.write(f"\rLoading training data: {percent:.1f}%")
                sys.stdout.flush()

    print("\nLoading complete.")
    return training_data



def save_training_results(w1, w2, b1, b2) -> None:
    w1_df = pd.DataFrame(w1)
    w1_df.to_csv("w1_weights.csv", index=False)

    w2_df = pd.DataFrame(w2)
    w2_df.to_csv("w2_weights.csv", index=False)

    b1_df = pd.DataFrame(b1)
    b1_df.to_csv("b1_bias.csv", index=False)

    b2_df = pd.DataFrame(b2)
    b2_df.to_csv("b2_bias.csv", index=False)


def train() -> None:
    training_data = load_training_data("scientific_vectors.csv")
    print("loaded training data")
    list_of_scientific_names = get_training_names()

    classifier = FungiClassifier(
        training_data=training_data,
        hidden_layer_size=HIDDEN_LAYER_SIZE,
        learning_rate=0.001,
        output_values=list_of_scientific_names,
        lambda_value=0.5,
    )

    w1, w2, b1, b2 = classifier.train(100)
    save_training_results(w1, w2, b1, b2)


def read_weights(file_path: str, shape: tuple[int, int]) -> np.ndarray:
    try:
        df = pd.read_csv(file_path, header=0)
        flat = df.to_numpy().flatten()

        expected_size = shape[0] * shape[1]
        if flat.size != expected_size:
            raise ValueError(
                f"Array size {flat.size} doesn't match expected size {expected_size} for shape {shape}")

        return flat.reshape(shape)
    except Exception as e:
        print(f"Error reading weights from {file_path}: {e}")
        raise


def test() -> None:
    w1 = read_weights("w1_weights.csv", (HIDDEN_LAYER_SIZE, 128*128))
    print("W1 loaded")
    w2 = read_weights("w2_weights.csv", (OUTPUT_LAYER_SIZE, HIDDEN_LAYER_SIZE))
    print("W2 loaded")
    b1 = read_weights("b1_bias.csv", (HIDDEN_LAYER_SIZE, 1))
    b2 = read_weights("b2_bias.csv", (OUTPUT_LAYER_SIZE, 1))

    list_of_scientific_names = get_training_names()
    classifier = FungiClassifier(
        hidden_layer_size=HIDDEN_LAYER_SIZE,
        learning_rate=0.001,
        output_values=list_of_scientific_names,
        lambda_value=0.5,
        w1=w1,
        w2=w2,
        b1=b1,
        b2=b2,
    )

    # input_vector = process_image("DF20M/2238524876-248923.JPG")
    input_vector = process_image("./test-values/Agaricus augustus Fr..jpg")
    if input_vector is None:
        raise ValueError("Failed to process image")

    predicted_name, confidence = classifier.test_image(input_vector)
    print(predicted_name, confidence)
    visualize_vector(input_vector)


def visualizer():
    visualize_all(load_training_data("scientific_vectors.csv"))

def main() -> None:
    # visualizer()
    test()
    # train()
    # convert_images()


if __name__ == "__main__":
    main()
