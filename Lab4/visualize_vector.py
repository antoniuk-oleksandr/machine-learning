import matplotlib.pyplot as plt

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
