import pandas as pd  # type: ignore
import csv
from process_image import process_image


# Agaricus augustus Fr.; Boletus edulis Bull.; Amanita muscaria (L.) Lam., 1783;
# Russula olivacea (Schaeff.) Fr.; Mycena galericulata (Scop.) Gray;
# Clitocybe nebularis (Batsch) Quél.; Amanita rubescens (Pers.) Gray;
# Russula ochroleuca (Pers.) Fr.; Amanita fulva (Schaeff.) Fr.;
# Mycena rosea (Schumach.) Gramberg

# 6811 images



# def convert_images():
#     output_path = "scientific_vectors.csv"
#     df = pd.read_csv("DF20M-train_metadata_PROD.csv")
#     data = df[["scientificName", "image_path"]]

#     names = get_training_names()
#     names_map = {name: i for i, name in enumerate(names)}
#     selected_fungi_df = data[data['scientificName'].isin(names)]

#     with open(output_path, mode="w", newline="") as f:
#         writer = csv.writer(f)

#         for i in range(len(selected_fungi_df)):
#             try:
#                 path = f"DF20M/{selected_fungi_df['image_path'].iloc[i]}"
#                 name = selected_fungi_df["scientificName"].iloc[i]
#                 map_index = names_map[name]
#                 vector = process_image(path)
#                 if vector is None:
#                     print(f"Skipping image {path} due to processing error.")
#                     continue

#                 writer.writerow([map_index] + list(vector))
#                 print(f"Processed {i + 1}/{len(selected_fungi_df)}: {name}")
#             except Exception as e:
#                 print(f"Error at {i}: {e}")

def convert_images():
    output_path = "scientific_vectors.csv"
    df = pd.read_csv("DF20M-train_metadata_PROD.csv")
    data = df[["scientificName", "image_path"]]

    print(data[data['scientificName'].isin(["Amanita muscaria (L.) Lam., 1783"])])  # Check for NaN values

    return
    names = get_training_names()
    # Ensure filtered data follows the EXACT order of names
    selected_fungi_df = data[data['scientificName'].isin(names)]
    
    
    selected_fungi_df = data[data['scientificName'].isin(names)].copy()

    
    selected_fungi_df = selected_fungi_df.sort_values('scientificName')
    print(selected_fungi_df.value_counts('scientificName'))

    with open(output_path, mode="w", newline="") as f:
        writer = csv.writer(f)

        for i in range(len(selected_fungi_df)):
            try:
                path = f"DF20M/{selected_fungi_df['image_path'].iloc[i]}"
                name = selected_fungi_df["scientificName"].iloc[i]
                map_index = names.index(name)  # Directly use list index
                vector = process_image(path)
                if vector is None:
                    print(f"Skipping image {path} due to processing error.")
                    continue

                # Ensure vector is flattened and normalized
                writer.writerow([map_index] + vector.tolist())
                print(f"Processed {i + 1}/{len(selected_fungi_df)}: {name}")
            except Exception as e:
                print(f"Error at {i}: {e}")

def get_training_names():
    return [
        "Agaricus augustus Fr.", "Boletus edulis Bull.", "Amanita muscaria (L.) Lam., 1783",
        "Russula olivacea (Schaeff.) Fr.", "Mycena galericulata (Scop.) Gray",
        "Clitocybe nebularis (Batsch) Quél.", "Amanita rubescens (Pers.) Gray",
        "Russula ochroleuca (Pers.) Fr.", "Amanita fulva (Schaeff.) Fr.",
        "Mycena rosea (Schumach.) Gramberg"
    ]


# Mycena galericulata (Scop.) Gray      1099
# Clitocybe nebularis (Batsch) Quél.    1003
# Amanita muscaria (L.) Lam., 1783       863
# Boletus edulis Bull.                   811
# Amanita rubescens (Pers.) Gray         713
# Russula ochroleuca (Pers.) Fr.         638
# Amanita fulva (Schaeff.) Fr.           575
# Mycena rosea (Schumach.) Gramberg      538
# Agaricus augustus Fr.                  337
# Russula olivacea (Schaeff.) Fr.        234
