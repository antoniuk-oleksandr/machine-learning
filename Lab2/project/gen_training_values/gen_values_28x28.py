import csv
import json

def convert_mnist_csv_to_json(csv_path, output_json):
    data = []
    with open(csv_path) as f:
        reader = csv.reader(f)
        next(reader)  # Skip header
        for index, row in enumerate(reader):
            if index == 1000:
                break
            
            label = int(row[0])
            pixels = [int(x)/255.0 for x in row[1:]]  # Normalize to 0-1
            data.append({"number": label, "pixels": pixels})
    
    with open(output_json, 'w') as f:
        json.dump(data, f, indent=2)

# Usage (change paths as needed)
convert_mnist_csv_to_json("csv_files/mnist_train.csv", "mnist_28x28.json")
