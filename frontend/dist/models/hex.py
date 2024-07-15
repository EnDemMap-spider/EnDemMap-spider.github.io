from typing import TypedDict


class Town(TypedDict):
    test: int
    hh_access: int


class Pars(TypedDict):
    interest_rate: float
    num_years: int


class Result(TypedDict):
    profit: float


def model(town: Town, pars: Pars) -> Result:
    # made-up calculation
    profit = town["test"] * pars["interest_rate"] 
    return Result(
        profit=profit,
    )
