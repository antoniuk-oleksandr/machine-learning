import csv
import numpy as np


class FungiClassifier:
    def __init__(
        self, hidden_layer_size: int, learning_rate: float,
        output_values: list[str], file_path: str, lambda_value: float = 1.0
    ):
        self.hidden_layer_size = hidden_layer_size
        self.output_layer_size = len(output_values)
        self.learning_rate = learning_rate
        self.lambda_value = lambda_value
        self.output_values = output_values
        self.file_path = file_path
        self.output_values = self.convert_output_values_to_map()
        
        first = next(self.stream_training_data())
        self.input_size = len(first[1])
        self.initialize_bias()
        self.initialize_weights()

    def convert_output_values_to_map(self):
        return {name: i for i, name in enumerate(self.output_values)}

    def initialize_weights(self):
        self.w1 = np.random.randn(self.hidden_layer_size, self.input_size) * \
            np.sqrt(2.0 / (self.input_size + self.hidden_layer_size))
        self.w2 = np.random.randn(self.output_layer_size, self.hidden_layer_size) * \
            np.sqrt(2.0 / (self.hidden_layer_size + self.output_layer_size))

    def stream_training_data(self, limit=500):
        with open(self.file_path, "r") as file:
            reader = csv.reader(file)
            for i, row in enumerate(reader):
                # if i >= limit:
                #     break
                name = row[0]
                input_vector = list(map(float, row[1:]))
                vector = np.array(input_vector).reshape(-1, 1)

                yield name, vector

    def initialize_bias(self):
        self.b1 = np.zeros((self.hidden_layer_size, 1))
        self.b2 = np.zeros((self.output_layer_size, 1))

    def sigmoid(self, net: np.array) -> np.array:
        return 1 / (1 + np.exp(-self.lambda_value * net))

    def sigmoid_derivative(self, output: np.array) -> np.array:
        return self.lambda_value * output * (1 - output)

    def softmax(self, net: np.array) -> np.array:
        exp_net = np.exp(net - np.max(net))  # Стабілізація
        return exp_net / np.sum(exp_net, axis=0)

    def forward(self, input_vector: np.array) -> tuple:
        # Прихований шар
        self.net1 = np.dot(self.w1, input_vector) + self.b1
        self.a1 = self.sigmoid(self.net1)

        # Вихідний шар
        self.net2 = np.dot(self.w2, self.a1) + self.b2
        self.a2 = self.softmax(self.net2)

        return self.a1, self.a2

    def backward(self, input_vector: np.array, one_hot: np.array) -> None:
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

    def predict(self, X: np.array) -> np.array:
        _, probabilities = self.forward(X)
        return probabilities

    def compute_loss(self, y_true: np.array) -> float:
        return -np.mean(y_true * np.log(self.a2 + 1e-8))

    def one_hot(self, fungi_name: str):
        one_hot_vector = np.zeros((self.output_layer_size, 1))
        index = self.output_values[fungi_name]
        one_hot_vector[index] = 1
        return one_hot_vector

    def train(self, epochs: int = 100):
        for epoch in range(epochs):
            total_loss = 0.0
            count = 0

            for idx, (name, vector) in enumerate(self.stream_training_data()):
                self.forward(vector)
                one_hot = self.one_hot(name)
                total_loss += self.compute_loss(one_hot)
                self.backward(vector, one_hot)
                count += 1

                print(
                    f"Epoch {epoch + 1}/{epochs} - avarage loss: {total_loss / count:.4f} - image: {idx+1}/36393")

        return self.w1, self.w2
