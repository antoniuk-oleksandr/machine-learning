import csv
import random
from typing import Mapping
import numpy as np


class FungusClassifier:
    def __init__(
        self,
        hidden_layer_size: int,
        learning_rate: float,
        output_values: list[str],
        w1=None,
        w2=None,
        b1=None,
        b2=None,
        file_path: str | None = None,
        training_data: list[tuple[int, np.ndarray]] | None = None,
        lambda_value: float = 1.0,
    ):
        self.hidden_layer_size = hidden_layer_size
        self.learning_rate = learning_rate
        self.lambda_value = lambda_value
        self.file_path = file_path
        self.output_values = output_values
        self.output_layer_size = len(output_values)
        self.training_data = training_data

        self.w1 = w1
        self.w2 = w2
        self.b1 = b1
        self.b2 = b2

        if w1 is None or w2 is None:
            self.initialize_weights()

        if b1 is None or b2 is None:
            self.initialize_bias()

        if self.training_data is not None:
            self.input_size = len(self.training_data[0][1])

    # Xavier initialization
    def initialize_weights(self):
        self.w1 = np.random.randn(self.hidden_layer_size, self.input_size) * np.sqrt(
            1.0 / self.input_size
        )
        self.w2 = np.random.randn(self.output_layer_size, self.hidden_layer_size) * np.sqrt(
            1.0 / self.hidden_layer_size
        )

    def initialize_bias(self):
        self.b1 = np.zeros((self.hidden_layer_size, 1))
        self.b2 = np.zeros((self.output_layer_size, 1))

    def sigmoid(self, net: np.ndarray) -> np.ndarray:
        return 1 / (1 + np.exp(-self.lambda_value * net)) # type: ignore

    def sigmoid_derivative(self, output: np.ndarray) -> np.ndarray:
        return self.lambda_value * output * (1 - output)

    def softmax(self, net: np.ndarray) -> np.ndarray:
        exp_net = np.exp(net - np.max(net))  # Stabilization
        return exp_net / np.sum(exp_net, axis=0)

    def forward(self, input_vector: np.ndarray) -> tuple:
        if self.w1 is None or self.w2 is None or self.b1 is None or self.b2 is None:
            raise ValueError("Weights and biases are not initialized")

        # Hidden layer
        self.net1 = np.dot(self.w1, input_vector) + self.b1
        self.o1 = self.sigmoid(self.net1)

        # Output layer
        self.net2 = np.dot(self.w2, self.o1) + self.b2
        self.o2 = self.softmax(self.net2)

        return self.o1, self.o2

    def backward(self, input_vector: np.ndarray, one_hot: np.ndarray) -> None:
        if self.w1 is None or self.w2 is None or self.b1 is None or self.b2 is None:
            raise ValueError("Weights and biases are not initialized")

        # Gradients of the output layer
        delta2 = self.o2 - one_hot
        dW2 = np.dot(delta2, self.o1.T)
        db2 = np.sum(delta2, axis=1, keepdims=True)

        # Hidden layer gradients
        delta1 = np.dot(self.w2.T, delta2) * self.sigmoid_derivative(self.o1)
        dW1 = np.dot(delta1, input_vector.T)
        db1 = np.sum(delta1, axis=1, keepdims=True)

        self.w2 -= self.learning_rate * dW2
        self.b2 -= self.learning_rate * db2
        self.w1 -= self.learning_rate * dW1
        self.b1 -= self.learning_rate * db1

    def calculate_loss(self, one_hot: np.ndarray) -> float:
        return -np.sum(one_hot * np.log(self.o2 + 1e-8))

    def one_hot(self, fungi_index: int):
        one_hot_vector = np.zeros((self.output_layer_size, 1))
        one_hot_vector[fungi_index] = 1
        return one_hot_vector

    def test_image(self, input_vector: np.ndarray) -> Mapping[str, float]:
        if self.w1 is None or self.w2 is None or self.b1 is None or self.b2 is None:
            raise ValueError("Weights and biases are not initialized")

        if input_vector.ndim == 1:
            input_vector = input_vector.reshape(-1, 1)

        self.forward(input_vector)

        return {self.output_values[idx]: float(x[0]) for idx, x in enumerate(self.o2)}

    def train(self, epochs=100):
        if self.training_data is None:
            raise ValueError("Training data is not provided")

        for epoch in range(epochs):
            total_loss = 0.0
            correct = 0
            count = 0
            random.shuffle(self.training_data)

            for iteration, (fungi_index, vector) in enumerate(self.training_data):
                # Forward pass
                self.forward(vector)

                predicted_idx = np.argmax(self.o2)
                if predicted_idx == fungi_index:
                    correct += 1

                # Backpropagation
                one_hot = self.one_hot(fungi_index)
                total_loss += self.calculate_loss(one_hot)
                self.backward(vector, one_hot)
                count += 1

                if iteration % 100 == 0 and iteration > 0:
                    acc = correct/(iteration+1)
                    print(
                        f"Epoch {epoch+1} | Image {iteration} | Loss: {total_loss/(iteration+1):.2f} | Acc: {acc:.2%}")

            print(
                f"Epoch {epoch+1} completed | Avg Loss: {total_loss/count:.2f} | Accuracy: {correct/count:.2%}")

        return self.w1, self.w2, self.b1, self.b2
