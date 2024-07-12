from typing import TypedDict


class Town(TypedDict): ...


class Pars(TypedDict): ...


class Result(TypedDict):
    profit: int


def model(town: Town, pars: Pars) -> Result:
    return Result(
        profit=0,
    )
