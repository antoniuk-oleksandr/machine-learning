import csv

import pandas as pd

from model_training import FungiClassifier


def get_list_of_scientific_names() -> list[str]:
    df = pd.read_csv("DF20M-public_test_metadata_PROD.csv")
    scientific_name_dataframe = df[["scientificName"]].drop_duplicates()
    return scientific_name_dataframe["scientificName"].tolist()


def save_weights(w1, w2) -> None:
    w1_df = pd.DataFrame(w1)
    w1_df.to_csv("w1_weights2.csv", index=False)

    w2_df = pd.DataFrame(w2)
    w2_df.to_csv("w2_weights2.csv", index=False)


def main() -> None:
    list_of_scientific_names = get_list_of_scientific_names()

    classifier = FungiClassifier(
        hidden_layer_size=512,
        learning_rate=0.1,
        output_values=list_of_scientific_names,
        file_path="scientific_vectors.csv",
        lambda_value=1
    )

    w1, w2 = classifier.train(1)
    save_weights(w1, w2)


if __name__ == "__main__":
    main()
