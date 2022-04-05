const center = [37.7, 0.31];
const zoom = 6;
const loc = {center, zoom};

const popup = [
  {
    col: "adm1",
    label: "adm1",
    unit: "",
    fmt: false,
  },
  {
    col: "grid_dist",
    label: "Grid dist",
    unit: "km",
    fmt: true,
  },
  {
    col: "road_dist",
    label: "Road dist",
    unit: "km",
    fmt: true,
  },
  {
    col: "tech",
    label: "Farm type",
    unit: "",
    fmt: false,
  },
  {
    col: "fish_output",
    label: "Fish output",
    unit: "tons/year",
    fmt: true,
  },
  {
    col: "profit",
    label: "Profit",
    unit: "USD/year",
    fmt: true,
  },
  {
    col: "gov_costs",
    label: "Gov costs",
    unit: "USD/year",
    fmt: true,
  },
  {
    col: "social",
    label: "Social",
    unit: "USD/year",
    fmt: true,
  },
];

const infra = [
  {
    col: "grid_dist",
    label: "Grid",
    type: "line",
    color: "#FF0000",
  },
  {
    col: "road_dist",
    label: "Road",
    type: "line",
    color: "#0000FF",
  },
];

const pars = [
  {
    col: "duration",
    label: "Duration",
    min: 5,
    max: 20,
    val: 10,
    unit: "years",
  },
  {
    col: "interest_rate",
    label: "Interest rate",
    min: 0,
    max: 100,
    val: 6,
    unit: "%",
  },
  {
    col: "fish_price",
    label: "Fish sale price",
    min: 0,
    max: 10000,
    val: 6000,
    unit: "USD/ton",
  },
  {
    col: "max_fish_output",
    label: "Max fish output",
    min: 0,
    max: 100000,
    val: 10000,
    unit: "ton/yr",
  },
  {
    col: "labor_per_hh",
    label: "Labour available",
    min: 0,
    max: 10,
    val: 0.5,
    unit: "people per hh",
  },
  {
    col: "min_pop",
    label: "Min pop",
    min: 0,
    max: 100000,
    val: 0,
    unit: "people",
  },
  {
    col: "max_pop",
    label: "Max pop",
    min: 0,
    max: 1000000,
    val: 200000,
    unit: "people",
  },
  {
    col: "max_lake_dist",
    label: "Max Lake Vic dist",
    min: 0,
    max: 100,
    val: 9,
    unit: "km",
  },
  {
    col: "max_water_dist",
    label: "Max lake dist",
    min: 0,
    max: 100,
    val: 9,
    unit: "km",
  },
  {
    col: "min_precip",
    label: "Min precip",
    min: 0,
    max: 1000,
    val: 0,
    unit: "mm/year",
  },
  {
    col: "truck_econ_multi",
    label: "Truck traffic multiplier",
    min: 0,
    max: 10,
    val: 1,
    unit: "x",
  },
  {
    col: "traffic_pp",
    label: "Current traffic",
    min: 0,
    max: 1,
    val: 1 / 2000,
    unit: "vehicles/person",
  },
  {
    col: "mg_cost_pkw",
    label: "MG cost",
    min: 0,
    max: 10000,
    val: 6000,
    unit: "USD/kW",
  },
  {
    col: "elec_ice",
    label: "Energy for ice",
    min: 0,
    max: 500,
    val: 125,
    unit: "kWh/ton of fish/year",
  },
  {
    col: "ice_power",
    label: "Power for ice",
    min: 0,
    max: 1,
    val: 0.1,
    unit: "kW/ton capacity",
  },
  {
    col: "aeration_power",
    label: "Power for aeration",
    min: 0,
    max: 10,
    val: 1.25,
    unit: "kW/ton capacity",
  },
];

const attrs = [
  {
    col: "road_dist",
    label: "road distance",
    min: 0,
    max: 100,
    minCol: "hsl(60, 29%, 93%)",
    maxCol: "hsl(60, 100%, 23%)",
  },
  {
    col: "grid_dist",
    label: "grid distance",
    min: 0,
    max: 100,
    minCol: "hsl(90, 29%, 93%)",
    maxCol: "hsl(90, 100%, 23%)",
  },
  {
    col: "tech",
    label: "farm type",
    cats: ["cage", "pond"],
    colors: [
      "hsla(0, 60%, 60%, 1)",
      "hsla(100, 60%, 60%, 1)",
      "hsla(200, 60%, 60%, 0.2)",
    ],
  },
  {
    col: "fish_output",
    label: "fish output",
    min: 0,
    max: 10000,
    minCol: "hsl(220, 29%, 93%)",
    maxCol: "hsl(220, 100%, 23%)",
  },
  {
    col: "revenue",
    label: "revenue",
    min: 0,
    max: 55_000_000,
    minCol: "hsl(30, 29%, 93%)",
    maxCol: "hsl(30, 100%, 23%)",
  },
  {
    col: "profit",
    label: "profit",
    min: 0,
    max: 15_000_000,
    minCol: "hsl(0, 29%, 93%)",
    maxCol: "hsl(0, 100%, 23%)",
  },
  {
    col: "gov_costs",
    label: "gov costs",
    min: 0,
    max: 150_000_000,
    minCol: "hsl(300, 29%, 93%)",
    maxCol: "hsl(300, 100%, 23%)",
  },
  {
    col: "gov_annual",
    label: "gov costs (annual)",
    min: 0,
    max: 1,
    minCol: "hsl(270, 29%, 93%)",
    maxCol: "hsl(270, 100%, 23%)",
  },
  {
    col: "social",
    label: "social benefits",
    min: 0,
    max: 10,
    minCol: "hsl(320, 29%, 93%)",
    maxCol: "hsl(320, 100%, 23%)",
  },
];

export default {loc, popup, infra, pars, attrs};
