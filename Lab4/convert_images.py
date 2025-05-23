import pandas as pd # type: ignore
import csv
from process_image import process_image

def convert_images():
    df = pd.read_csv("DF20M-train_metadata_PROD.csv")
    data = df[["scientificName", "image_path"]]

    output_path = "scientific_vectors.csv"

    with open(output_path, mode="w", newline="") as f:
        writer = csv.writer(f)

        for i in range(len(data)):
            try:
                path = f"DF20M/{data['image_path'].iloc[i]}"
                name = data["scientificName"].iloc[i]
                vector = process_image(path)
                writer.writerow([name] + list(vector))
                print(f"Processed {i + 1}/{len(data)}: {name}")
            except Exception as e:
                print(f"Error at {i}: {e}")
