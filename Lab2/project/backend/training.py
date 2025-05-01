import math
import random
import time
from typing import List
from models.learning_value import LearningValue


class DigitClassifier:
    def __init__(
        self, c_value: float = None, e_value: float = None, accuracy: float = None,
        learning_values: List[LearningValue] = None, grid_size: int = 24,
        weights: List[List[float]] = None,
    ):
        self.c_value = c_value
        self.e_value = e_value
        self.accuracy = accuracy
        self.learning_values = learning_values
        self.grid_size = grid_size ** 2

        if weights == None:
            self.weights = self.get_initial_weights()
        else:
            self.weights = weights

    def get_initial_weights(self) -> List[List[float]]:
        weights = []
        for _ in range(self.grid_size):
            temp_arr = []
            for _ in range(10):
                temp_arr.append(random.uniform(-0.5, 0.5))
            weights.append(temp_arr)
        return weights

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

    def calc_next_weights(self, softmax_values: List[float], pixels: List[float], one_hot: List[float]) -> List[List[float]]:
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

    def train_one_value(self, learning_value: LearningValue):
        epoch = 1
        while True:
            z_values = self.calc_z_values(learning_value.pixels)  # FIXED HERE
            softmax_values = self.calc_softmax_values(z_values)
            one_hot = self.define_one_hot_value(learning_value.number)
            cross_entropy = self.calc_cross_entropy_value(
                one_hot, softmax_values)

            if cross_entropy < self.e_value:
                break

            delta_weights = self.calc_next_weights(
                softmax_values, learning_value.pixels, one_hot
            )
            self.update_weights(delta_weights)

            epoch += 1

        return 0 if epoch == 1 else 1

    def train(self):
        start = time.perf_counter()
        while True:
            fails = 0
            for learning_value in self.learning_values:
                fails += self.train_one_value(learning_value)

            accuracy = (1 - (fails / len(self.learning_values))) * 100
            print(f"Accuracy: {accuracy}%")

            if accuracy >= self.accuracy:
                break

        end = time.perf_counter()
        elapsed = end - start
        print(f"Elapsed time: {elapsed:.2f} seconds")

        return self.weights

    def test(self, pixels: List[float]) -> int:
        z_values = self.calc_z_values(pixels)
        softmax_values = self.calc_softmax_values(z_values)
        print(f"Softmax values: {softmax_values}")
        return softmax_values.index(max(softmax_values))
