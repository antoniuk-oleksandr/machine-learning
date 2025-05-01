from sklearn.datasets import load_digits # type: ignore
import json

def get_normalized_digits_as_json():
    digits = load_digits()
    images = digits.images  
    labels = digits.target

    data = []
    for image, label in zip(images, labels):
        normalized_image = (image.flatten() / 16.0).tolist()
        data.append({
            "number": int(label),
            "pixels": normalized_image
        })

    return data

def save_to_file(data, filename="digits_24x24.json"):
    with open(filename, "w") as f:
        json.dump(data, f, indent=2)

# Example usage
if __name__ == "__main__":
    digit_data = get_normalized_digits_as_json()
    save_to_file(digit_data)
