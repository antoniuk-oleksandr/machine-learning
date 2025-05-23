import csv
import numpy as np # type: ignore

import pandas as pd  # type: ignore

from model_training import FungiClassifier
from process_image import process_image


def get_list_of_scientific_names() -> list[str]:
    df = pd.read_csv("DF20M-public_test_metadata_PROD.csv")
    scientific_name_dataframe = df[["scientificName"]].drop_duplicates()
    return scientific_name_dataframe["scientificName"].tolist()


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
    list_of_scientific_names = get_list_of_scientific_names()

    classifier = FungiClassifier(
        hidden_layer_size=512,
        learning_rate=0.1,
        output_values=list_of_scientific_names,
        file_path="scientific_vectors.csv",
        lambda_value=1,
    )

    w1, w2, b1, b2 = classifier.train(1)
    save_training_results(w1, w2, b1, b2)


def read_weights(file_path: str, shape: tuple[int, int]) -> np.ndarray:
    try:
        df = pd.read_csv(file_path, header=0)
        flat = df.to_numpy().flatten()
        
        expected_size = shape[0] * shape[1]
        if flat.size != expected_size:
            raise ValueError(f"Array size {flat.size} doesn't match expected size {expected_size} for shape {shape}")
        
        return flat.reshape(shape)
    except Exception as e:
        print(f"Error reading weights from {file_path}: {e}")
        raise


def test() -> None:
    w1 = read_weights("w1_weights2.csv", (512, 128*128))
    print("W1 loaded")
    w2 = read_weights("w2_weights2.csv", (182, 512))
    print("W2 loaded")
    
    list_of_scientific_names = get_list_of_scientific_names()
    classifier = FungiClassifier(
        hidden_layer_size=512,
        learning_rate=0.1,
        output_values=list_of_scientific_names,
        lambda_value=1,
    )
    
    input_vector = process_image("test-values/amanita.jpg")
    if input_vector is None:
        raise ValueError("Failed to process image")
    
    print(input_vector)
    predicted_name, confidence = classifier.test_image(input_vector, w1, w2)
    print(predicted_name, confidence)


def main() -> None:
    test()


if __name__ == "__main__":
    main()
