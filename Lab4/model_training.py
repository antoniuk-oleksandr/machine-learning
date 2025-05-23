import csv
import numpy as np  # type: ignore


class FungiClassifier:
    def __init__(
        self,
        hidden_layer_size: int,
        learning_rate: float,
        output_values: list[str],
        file_path: str | None = None,
        lambda_value: float = 1.0,
    ):
        self.hidden_layer_size = hidden_layer_size
        self.output_layer_size = len(output_values)
        self.learning_rate = learning_rate
        self.lambda_value = lambda_value
        self.output_values = output_values
        self.file_path = file_path
        self.output_values = self.convert_output_values_to_map()

        if file_path is not None:
            first = next(self.stream_training_data())
            self.input_size = len(first[1])
            self.initialize_bias()
            self.initialize_weights()


    def convert_output_values_to_map(self):
        return {name: i for i, name in enumerate(self.output_values)}

    def initialize_weights(self):
        self.w1 = np.random.randn(self.hidden_layer_size, self.input_size) * np.sqrt(
            2.0 / (self.input_size + self.hidden_layer_size)
        )
        self.w2 = np.random.randn(
            self.output_layer_size, self.hidden_layer_size
        ) * np.sqrt(2.0 / (self.hidden_layer_size + self.output_layer_size))

    def stream_training_data(self, limit=500):
        if self.file_path is None:
            raise ValueError("No file path provided")
        
        with open(self.file_path, "r") as file:
            reader = csv.reader(file)
            for i, row in enumerate(reader):
                if i >= limit:
                    break
                name = row[0]
                input_vector = list(map(float, row[1:]))
                vector = np.array(input_vector).reshape(-1, 1)

                yield name, vector

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
        # Прихований шар
        self.net1 = np.dot(self.w1, input_vector) + self.b1
        self.a1 = self.sigmoid(self.net1)

        # Вихідний шар
        self.net2 = np.dot(self.w2, self.a1) + self.b2
        self.a2 = self.softmax(self.net2)

        return self.a1, self.a2

    def backward(self, input_vector: np.ndarray, one_hot: np.ndarray) -> None:
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
        return -np.mean(y_true * np.log(self.a2 + 1e-8))

    def one_hot(self, fungi_name: str):
        one_hot_vector = np.zeros((self.output_layer_size, 1))
        index = self.output_values[fungi_name]
        one_hot_vector[index] = 1
        return one_hot_vector

    def test_image(
        self, input_vector: np.ndarray, w1: np.ndarray, w2: np.ndarray
    ) -> tuple[str, float]:
        # Perform forward pass using provided weights
        net1 = np.dot(w1, input_vector) + self.b1
        a1 = self.sigmoid(net1)

        net2 = np.dot(w2, a1) + self.b2
        a2 = self.softmax(net2)

        # Get the predicted class index and confidence
        predicted_index = np.argmax(a2)
        confidence = float(a2[predicted_index])

        # Reverse lookup to get class name
        index_to_name = {v: k for k, v in self.output_values.items()}
        predicted_name = index_to_name[predicted_index]

        return predicted_name, confidence

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
                    f"Epoch {epoch + 1}/{epochs} - avarage loss: {total_loss / count:.4f} - image: {idx+1}/36393"
                )

        return self.w1, self.w2, self.b1, self.b2
