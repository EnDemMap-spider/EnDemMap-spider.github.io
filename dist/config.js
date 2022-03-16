export const pars = [
  {
    var: "duration",
    label: "Duration",
    min: 5,
    max: 20,
    val: 10,
    unit: "years",
  },
  {
    var: "interest_rate",
    label: "Interest rate",
    min: 0,
    max: 100,
    val: 6,
    unit: "%",
  },
  {
    var: "fish_price",
    label: "Fish sale price",
    min: 0,
    max: 10000,
    val: 6000,
    unit: "USD/ton",
  },
  {
    var: "max_fish_output",
    label: "Max fish output",
    min: 0,
    max: 100000,
    val: 10000,
    unit: "ton/yr",
  },
  {
    var: "labor_per_hh",
    label: "Labour available",
    min: 0,
    max: 10,
    val: 0.5,
    unit: "people per hh",
  },
  {
    var: "min_pop",
    label: "Min pop",
    min: 0,
    max: 100000,
    val: 33000,
    unit: "people",
  },
  {
    var: "max_pop",
    label: "Max pop",
    min: 0,
    max: 1000000,
    val: 200000,
    unit: "people",
  },
  {
    var: "max_lake_dist",
    label: "Max Lake Vic dist",
    min: 0,
    max: 100,
    val: 9,
    unit: "km",
  },
  {
    var: "max_water_dist",
    label: "Max lake dist",
    min: 0,
    max: 100,
    val: 9,
    unit: "km",
  },
  {
    var: "min_precip",
    label: "Min precip",
    min: 0,
    max: 1000,
    val: 500,
    unit: "mm/year",
  },
  {
    var: "truck_econ_multi",
    label: "Truck traffic multiplier",
    min: 0,
    max: 10,
    val: 1,
    unit: "x",
  },
  {
    var: "traffic_pp",
    label: "Current traffic",
    min: 0,
    max: 1,
    val: 1 / 2000,
    unit: "vehicles/person",
  },
  {
    var: "mg_cost_pkw",
    label: "MG cost",
    min: 0,
    max: 10000,
    val: 6000,
    unit: "USD/kW",
  },
  {
    var: "elec_ice",
    label: "Energy for ice",
    min: 0,
    max: 500,
    val: 125,
    unit: "kWh/ton of fish/year",
  },
  {
    var: "ice_power",
    label: "Power for ice",
    min: 0,
    max: 1,
    val: 0.1,
    unit: "kW/ton capacity",
  },
  {
    var: "aeration_power",
    label: "Power for aeration",
    min: 0,
    max: 10,
    val: 1.25,
    unit: "kW/ton capacity",
  },
];

export const attrs = [
  {
    var: "grid_dist",
    label: "grid distance",
    min: 0,
    max: 100,
    minCol: "hsl(90, 29%, 93%)",
    maxCol: "hsl(90, 100%, 23%)",
  },
  {
    var: "farm_type",
    label: "farm type",
    cats: ["cage", "pond"],
    colors: [
      "hsla(0, 60%, 60%, 1)",
      "hsla(100, 60%, 60%, 1)",
      "hsla(200, 60%, 60%, 0.2)",
    ],
  },
  {
    var: "fish_output",
    label: "fish output",
    min: 0,
    max: 10000,
    minCol: "hsl(220, 29%, 93%)",
    maxCol: "hsl(220, 100%, 23%)",
  },
  {
    var: "profit",
    label: "profit",
    min: 0,
    max: 15_000_000,
    minCol: "hsl(0, 29%, 93%)",
    maxCol: "hsl(0, 100%, 23%)",
  },
  {
    var: "gov_costs",
    label: "gov costs",
    min: 0,
    max: 150_000_000,
    minCol: "hsl(300, 29%, 93%)",
    maxCol: "hsl(300, 100%, 23%)",
  },
  {
    var: "social",
    label: "social benefits",
    min: 0,
    max: 15_000_000,
    minCol: "hsl(320, 29%, 93%)",
    maxCol: "hsl(320, 100%, 23%)",
  },
];
