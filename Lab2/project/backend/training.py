import math
import random
from typing import List
from models.learning_value import LearningValue


class DigitClassifier:
    def __init__(
        self,
        c_value: float = 0.01,
        accuracy: float = 95.0,
        learning_values: List[LearningValue] = None,
        grid_size: int = 24,
        weights: List[List[float]] = None,
    ):
        self.c_value = c_value
        self.accuracy = accuracy
        self.learning_values = learning_values
        self.grid_size = grid_size ** 2
        self.weights = weights if weights is not None else self.get_initial_weights()

    # Xavier initialization
    def get_initial_weights(self):
        scale = 1.0 / math.sqrt(self.grid_size)
        return [[random.uniform(-scale, scale) for _ in range(10)] for _ in range(self.grid_size)]

    def calc_z_values(self, pixels: List[float]) -> List[float]:
        z_values = []
        for i in range(10):
            sum_val = 0
            for k in range(self.grid_size):
                sum_val += self.weights[k][i] * pixels[k]
            z_values.append(sum_val)
        return z_values

    def calc_softmax_values(self, z_values: List[float]) -> List[float]:
        exp_values = [math.exp(z) for z in z_values]
        sum_exp_values = sum(exp_values)
        softmax_values = [exp_value /
                          sum_exp_values for exp_value in exp_values]
        return softmax_values

    def define_one_hot_value(self, actual_value: int) -> List[int]:
        one_hot = [0] * 10
        one_hot[actual_value] = 1
        return one_hot

    def calc_cross_entropy_value(self, one_hot: List[float], softmax_values: List[float]):
        cross_entropy = sum(
            math.log(softmax_values[i]) * one_hot[i] for i in range(10))
        return -cross_entropy

    def calc_next_weights(
        self, softmax_values: List[float], 
        pixels: List[float], one_hot: List[float]
    ) -> List[List[float]]:
        weights = []
        for i in range(self.grid_size):
            temp_arr = []
            for j in range(10):
                temp_arr.append(
                    self.c_value * (one_hot[j] - softmax_values[j]) * pixels[i]
                )
            weights.append(temp_arr)
        return weights

    def update_weights(self, delta_weights: List[List[float]]):
        for i in range(self.grid_size):
            for j in range(10):
                self.weights[i][j] += delta_weights[i][j]

    def form_message(self, epoch, accuracy, cross_entropy):
        return {
            "epoch": epoch + 1,
            "accuracy": accuracy,
            "crossEntropy": cross_entropy
        }

    def train(self, max_epochs: int = 100, on_epoch: callable = None):
        for epoch in range(max_epochs):
            total_correct = 0
            random.shuffle(self.learning_values)

            for lv in self.learning_values:
                z_values = self.calc_z_values(lv.pixels)
                softmax = self.calc_softmax_values(z_values)
                one_hot = self.define_one_hot_value(lv.number)

                weight_deltas = self.calc_next_weights(
                    softmax, lv.pixels, one_hot)
                self.update_weights(weight_deltas)

                predicted = softmax.index(max(softmax))
                if predicted == lv.number:
                    total_correct += 1

            cross_entropy = self.calc_cross_entropy_value(one_hot, softmax)
            accuracy = (total_correct / len(self.learning_values)) * 100
            on_epoch(self.form_message(
                epoch, accuracy, cross_entropy))

            if accuracy >= self.accuracy or accuracy == 100:
                break

        return self.weights

    def test(self, pixels: List[float]) -> int:
        z_values = self.calc_z_values(pixels)
        return self.calc_softmax_values(z_values)
