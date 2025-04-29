from body.point import Point
from body.task_two_body import TaskTwoBody
from typing import List


def handle_task_two(body: TaskTwoBody):
    k = calc_k_value(body.points)
    b = calc_b_value(body.points, k)

    return {
        "k": k,
        "b": b,
    }


def calc_k_value(points: List[Point]):
    n = len(points)
    sum_x = sum(point.x for point in points)
    sum_y = sum(point.y for point in points)
    sum_xy = sum(point.x * point.y for point in points)
    sum_x_squared = sum(point.x ** 2 for point in points)

    numerator = n * sum_xy - sum_x * sum_y
    denominator = n * sum_x_squared - sum_x ** 2

    if denominator == 0:
        raise ZeroDivisionError("Denominator is zero, cannot calculate k")

    k = numerator / denominator
    return k


def calc_b_value(points: List[Point], k: float) -> float:
    n = len(points)
    sum_y = sum(point.y for point in points)
    sum_x = sum(point.x for point in points)

    b = (sum_y - k * sum_x) / n
    return b
