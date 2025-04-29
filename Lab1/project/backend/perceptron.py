class Perceptron:
    def __init__(self, bias, weights, initial_values, learning_rate_coefficient):
        self.bias = bias
        self.weights = weights
        self.learning_rate_coefficient = learning_rate_coefficient
        self.initial_values = initial_values
        self.fails = 0

    def calc_net(self, x1, x2):
        return self.weights[0] * x1 + \
            self.weights[1] * x2 + self.weights[2] * self.bias

    def activation_function(self, net):
        if net >= 0:
            return 1
        else:
            return -1

    def calc_delta(self, iteration, output):
        expected = self.initial_values[iteration].classValue
        return expected - output

    def calc_next_weights(self, iteration, output):
        delta = self.calc_delta(iteration, output)

        self.weights[0] += self.learning_rate_coefficient * \
            delta * self.initial_values[iteration].x1
        self.weights[1] += self.learning_rate_coefficient * \
            delta * self.initial_values[iteration].x2
        self.weights[2] += self.learning_rate_coefficient * delta * self.bias

    def train_one_epoch(self):
        result = []

        for iteration, learning_value in enumerate(self.initial_values):
            net = self.calc_net(learning_value.x1, learning_value.x2)
            output = self.activation_function(net)
            result.append(output == learning_value.classValue)

            if (result[iteration] == False):
                self.fails += 1
                self.calc_next_weights(iteration, output)

        return result

    async def train(self, on_iteration):
        epoch = 1

        while True:
            self.fails = 0
            result = self.train_one_epoch()
            await on_iteration(epoch, self.weights, result, self.fails)

            if self.fails == 0:
                break

            epoch += 1

        return self.weights

    def get_separator_line(self):
        w1, w2, w3 = self.weights[0], self.weights[1], self.weights[2]

        if w2 == 0:
            raise ValueError("Devision by zero error: w2 cannot be zero.")

        k = -w1 / w2
        b = -w3 * self.bias / w2

        return k, b

    def test_model(self):
        value = self.initial_values[0]
        net = self.calc_net(value.x1, value.x2)
        output = self.activation_function(net)

        return output == value.classValue
