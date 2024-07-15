from typing import TypedDict


class Town(TypedDict):
    hh: int
    hh_access: int


class Pars(TypedDict):
    interest_rate: float
    num_years: int


class Result(TypedDict):
    profit: float


def model(town: Town, pars: Pars) -> Result:
    # made-up calculation
    profit = town["hh"] * pars["interest_rate"] + town["hh_access"] * pars["num_years"]
    return Result(
        profit=profit,
    )
