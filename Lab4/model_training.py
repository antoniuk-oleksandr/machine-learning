import csv
import random
import numpy as np  # type: ignore


class FungiClassifier:
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

        if self.training_data is not None:
            self.input_size = len(self.training_data[0][1])
            self.initialize_bias()
            self.initialize_weights()

    def initialize_weights(self):
        self.w1 = np.random.randn(self.hidden_layer_size, self.input_size) * np.sqrt(
            1.0 / self.input_size
        )
        self.w2 = np.random.randn(self.output_layer_size, self.hidden_layer_size) * np.sqrt(
            1.0 / self.hidden_layer_size
        )

    # def stream_training_data(self):
    #     if self.file_path is None:
    #         raise ValueError("No file path provided")

    #     with open(self.file_path, "r") as file:
    #         reader = csv.reader(file)
    #         for i, row in enumerate(reader):
    #             # if i >= limit:
    #             #   break
    #             fungi_index = int(row[0])
    #             input_vector = list(map(float, row[1:]))
    #             vector = np.array(input_vector).reshape(-1, 1)

    #             yield fungi_index, vector

    def initialize_bias(self):
        self.b1 = np.zeros((self.hidden_layer_size, 1))
        self.b2 = np.zeros((self.output_layer_size, 1))

    def sigmoid(self, net: np.ndarray) -> np.ndarray:
        return 1 / (1 + np.exp(-self.lambda_value * net))

    def sigmoid_derivative(self, output: np.ndarray) -> np.ndarray:
        return self.lambda_value * output * (1 - output)

    def softmax(self, net: np.ndarray) -> np.ndarray:
        exp_net = np.exp(net - np.max(net))  # Стабілізація
        return exp_net / np.sum(exp_net, axis=0)

    def forward(self, input_vector: np.ndarray) -> tuple:
        if self.w1 is None or self.w2 is None or self.b1 is None or self.b2 is None:
            raise ValueError("Weights and biases are not initialized")

        # Прихований шар
        self.net1 = np.dot(self.w1, input_vector) + self.b1
        self.a1 = self.sigmoid(self.net1)

        # Вихідний шар
        self.net2 = np.dot(self.w2, self.a1) + self.b2
        self.a2 = self.softmax(self.net2)

        return self.a1, self.a2

    def backward(self, input_vector: np.ndarray, one_hot: np.ndarray) -> None:
        if self.w1 is None or self.w2 is None or self.b1 is None or self.b2 is None:
            raise ValueError("Weights and biases are not initialized")

        # Градієнти вихідного шару
        delta2 = self.a2 - one_hot
        dW2 = np.dot(delta2, self.a1.T)
        db2 = np.sum(delta2, axis=1, keepdims=True)

        # Градієнти прихованого шару
        delta1 = np.dot(self.w2.T, delta2) * self.sigmoid_derivative(self.a1)
        dW1 = np.dot(delta1, input_vector.T)
        db1 = np.sum(delta1, axis=1, keepdims=True)

        # Оновлення ваг
        self.w2 -= self.learning_rate * dW2
        self.b2 -= self.learning_rate * db2
        self.w1 -= self.learning_rate * dW1
        self.b1 -= self.learning_rate * db1

    def compute_loss(self, y_true: np.ndarray) -> float:
        return -np.sum(y_true * np.log(self.a2 + 1e-8))

    def one_hot(self, fungi_index: int):
        one_hot_vector = np.zeros((self.output_layer_size, 1))
        one_hot_vector[fungi_index] = 1
        return one_hot_vector

    def test_image(self, input_vector: np.ndarray) -> tuple[str, float]:
        if self.w1 is None or self.w2 is None or self.b1 is None or self.b2 is None:
            raise ValueError("Weights and biases are not initialized")

        if input_vector.ndim == 1:
            input_vector = input_vector.reshape(-1, 1)

        self.forward(input_vector)

        predicted_index = int(np.argmax(self.a2))  # type: ignore
        predicted_name = self.output_values[predicted_index]
        confidence = float(self.a2.squeeze()[predicted_index])

        return predicted_name, confidence

    def train(self, epochs=100):
        if self.training_data is None:
            raise ValueError("Training data is not provided")

        for epoch in range(epochs):
            total_loss = 0.0
            correct = 0
            count = 0
            random.shuffle(self.training_data)


            for idx, (fungi_index, vector) in enumerate(self.training_data):
                # Forward pass
                self.forward(vector)

                # Calculate accuracy
                predicted_idx = np.argmax(self.a2)
                if predicted_idx == fungi_index:
                    correct += 1

                # Backpropagation
                one_hot = self.one_hot(fungi_index)
                total_loss += self.compute_loss(one_hot)
                self.backward(vector, one_hot)
                count += 1

                # Progress reporting
                if idx % 100 == 0 and idx > 0:
                    acc = correct/(idx+1)
                    print(
                        f"Epoch {epoch+1} | Image {idx} | Loss: {total_loss/(idx+1):.2f} | Acc: {acc:.2%}")
                    if acc >= 95:
                        return self.w1, self.w2, self.b1, self.b2
                        

            print(
                f"Epoch {epoch+1} completed | Avg Loss: {total_loss/count:.2f} | Accuracy: {correct/count:.2%}")

        return self.w1, self.w2, self.b1, self.b2
