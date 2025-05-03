import tkinter as tk
from tkinter import filedialog, messagebox
import json
import math

# Set this to your pixel width
GRID_WIDTH = 8
CELL_SIZE = 10  # Size of each cell in the canvas

class LearningValueViewer:
    def __init__(self, root):
        self.root = root
        self.root.title("Learning Value Viewer")

        self.data = []
        self.index = 0

        self.number_label = tk.Label(root, text="Number: N/A", font=("Arial", 16))
        self.number_label.pack(pady=10)

        self.canvas = tk.Canvas(root)
        self.canvas.pack()

        self.next_button = tk.Button(root, text="Next", command=self.show_next)
        self.next_button.pack(pady=10)

        menu = tk.Menu(root)
        root.config(menu=menu)
        file_menu = tk.Menu(menu)
        menu.add_cascade(label="File", menu=file_menu)
        file_menu.add_command(label="Open", command=self.load_file)

    def load_file(self):
        path = filedialog.askopenfilename(filetypes=[("JSON Files", "*.json")])
        if not path:
            return
        try:
            with open(path, "r") as f:
                self.data = json.load(f)
            self.index = 0
            self.show_next()
        except Exception as e:
            messagebox.showerror("Error", f"Failed to load file: {e}")

    def show_next(self):
        if not self.data:
            return
        if self.index >= len(self.data):
            messagebox.showinfo("End", "No more values.")
            return

        entry = self.data[self.index]
        self.number_label.config(text=f"Number: {entry['number']}")
        self.draw_pixels(entry["pixels"])
        self.index += 1

    def draw_pixels(self, pixels):
        self.canvas.delete("all")
        total_pixels = len(pixels)
        grid_height = math.ceil(total_pixels / GRID_WIDTH)
        self.canvas.config(width=GRID_WIDTH * CELL_SIZE, height=grid_height * CELL_SIZE)

        for i, val in enumerate(pixels):
            x = (i % GRID_WIDTH) * CELL_SIZE
            y = (i // GRID_WIDTH) * CELL_SIZE
            gray = int(val * 255)
            color = f"#{gray:02x}{gray:02x}{gray:02x}"
            self.canvas.create_rectangle(x, y, x+CELL_SIZE, y+CELL_SIZE, fill=color, outline="")

if __name__ == "__main__":
    root = tk.Tk()
    app = LearningValueViewer(root)
    root.mainloop()
