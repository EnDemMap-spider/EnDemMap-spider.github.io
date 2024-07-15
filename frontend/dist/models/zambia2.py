from typing import TypedDict


class Town(TypedDict):
    grid_dist: float


class Pars(TypedDict):
    interest_rate: float
    num_years: int


class Result(TypedDict):
    profit: float


def model(town: Town, pars: Pars) -> Result:
    # made-up calculation
    profit = (
        town["grid_dist"] * pars["interest_rate"]
        + town["grid_dist"] * pars["num_years"]
    )
    return Result(
        profit=profit,
    )
