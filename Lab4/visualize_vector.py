from typing import List, Tuple
import matplotlib.pyplot as plt
import numpy as np

from convert_images import get_training_names

def visualize_vector(vector, title="Processed Image"):
    if vector is None:
        print("Invalid vector provided")
        return
    
    if vector.ndim == 1:
        img = vector.reshape(128, 128)
    else:
        img = vector
    
    plt.figure(figsize=(6, 6))
    plt.imshow(img, cmap='gray', vmin=0, vmax=1)
    plt.title(f"{title}\nShape: {img.shape}")
    plt.axis('off')
    plt.show()


def visualize_all(training_data: List[Tuple[int, np.ndarray]]):
    names = get_training_names()
    
    for idx, (fungi_index, vector) in enumerate(training_data):
        reshaped_vector = vector.reshape(128, 128)
        visualize_vector(reshaped_vector, title=f"Fungi name: {names[fungi_index]}")
        

