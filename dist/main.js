/* global mapboxgl Vue hex */

import hex from "./hex.js";
import { pars, filts, attrs } from "./config.js";

const toObj = (arr) => arr.reduce((acc, el) => ((acc[el.var] = el), acc), {});

const toObjSingle = (arr, key) =>
  arr.reduce((acc, el) => ((acc[el.var] = el[key]), acc), {});

Vue.component("slider", {
  props: ["obj"],
  template: `
  <div>
    <div>{{ obj.label }}: {{ obj.val }} {{ obj.unit }}</div>
    <input type="range" :min="obj.min" :max="obj.max"
           class="slider" v-model="obj.val">
  </div>
  `,
});

const attrsObj = toObj(attrs);

// eslint-disable-next-line no-unused-vars
const app = new Vue({
  el: "#sidebar",
  data: {
    pars: pars,
    filts: filts,
    attrs: attrsObj,
    colorBy: "profit",
  },
  watch: {
    parVals: function () {
      this.debouncedUpdate();
    },
    filtVals: function () {
      this.debouncedUpdate();
    },
    colorBy: function () {
      this.debouncedUpdate();
    },
  },
  computed: {
    parVals: function () {
      return toObjSingle(this.pars, "val");
    },
    filtVals: function () {
      // this is just here because the watcher above
      // can't deal with deep objects...
      return toObjSingle(this.filts, "val");
    },
    colorByObj: function () {
      return this.attrs[this.colorBy];
    },
  },
  created: function () {
    this.debouncedUpdate = _.debounce(this.update, 500);
  },
  methods: {
    update: function () {
      updateHex(this.parVals, this.filts, this.colorByObj);
    },
  },
});

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2FyZGVybmUiLCJhIjoiY2puMXN5cnBtNG53NDN2bnhlZ3h4b3RqcCJ9.eNjrtezXwvM7Ho1VSxo06w";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/carderne/cl0rvsxn200ce14jz3q5j5hco?fresh=true",
  center: [37.7, 0.31],
  zoom: 6,
});

const draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    line_string: true,
    trash: true,
  },
  styles: [
    {
        "id": "gl-draw-line",
        "type": "line",
        "filter": ["all", ["==", "$type", "LineString"], ["!=", "mode", "static"]],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-color": "#000000",
          "line-width": 3
        }
    },
    {
        "id": "gl-draw-line-static",
        "type": "line",
        "filter": ["all", ["==", "$type", "LineString"], ["==", "mode", "static"]],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-color": "#000000",
          "line-width": 3
        }
    },
  ]
});
map.addControl(draw);
const joinLineToHex = (line) => {
  const length = Math.floor(turf.lineDistance(line, "km"));
  let points = {
    type: "FeatureCollection",
    features: [],
  };
  for (let step = 0; step < length + 6; step += 5) {
    points.features.push(turf.along(line, step, "km"));
  }
  const tagged = turf
    .tag(points, hex, "index", "hexId")
    .features.map((f) => f.properties.hexId);
  const ids = [...new Set(tagged)].filter(Number);
  return ids;
};
const updateLine = (e) => {
  const lines = draw.getAll();
  const ids = lines.features.map((f) => joinLineToHex(f.geometry)).flat(1);
  extendGrid(ids, 0);
  updateHex(app.parVals, app.filts, app.colorByObj);
};

const extendGrid = (ids, dist) => {
  let neis = [];
  ids.forEach((i) => {
    if (hex.features[i].properties.grid_dist > dist) {
      hex.features[i].properties.grid_dist = dist;
      const p = hex.features[i].properties;
      const nei = [p.n0, p.n1, p.n2, p.n3, p.n4, p.n5];
      neis.push(nei);
    }
  });
  if (neis.length > 0) {
    const idsSet = new Set(ids);
    const newIds = [...new Set(neis.flat(1))].filter((x) => !idsSet.has(x));
    extendGrid(newIds, dist + 10);
  }
};

map.on("draw.create", updateLine);
map.on("draw.delete", updateLine);
map.on("draw.update", updateLine);

let mapLoaded = false;
map.on("load", () => {
  mapLoaded = true;
  map.addSource("hex", {
    type: "geojson",
    data: hex,
  });

  updateHex(app.parVals, app.filts, app.colorByObj, false);
  map.addLayer({
    id: "hex",
    type: "fill",
    source: "hex",
    paint: {
      "fill-color": "rgba(0, 0, 0, 0)",
      "fill-opacity": ["interpolate", ["linear"], ["zoom"], 5, 0.6, 13, 0.2],
      "fill-outline-color": [
        "interpolate",
        ["linear"],
        ["zoom"],
        5,
        "hsla(0, 0%, 11%, 0)",
        13,
        "hsl(0, 0%, 11%)",
      ],
    },
  });
  map.addLayer({
    id: "hex_label",
    type: "symbol",
    source: "hex",
    layout: {
      "text-field": "{index}",
      "text-size": 10,
    },
    paint: {
      "text-halo-width": 1,
      "text-halo-color": "#fff",
      "text-halo-blur": 1,
      "text-color": "#000",
    },
  });
  updateHex(app.parVals, app.filts, app.colorByObj);
});

const objective = (props, parVals) => {
  return (
    props.grid_dist * parVals.grid +
    props.road_dist * parVals.road +
    props.pop * parVals.pop
  );
};

const filter = (filts) => {
  return ["all"].concat(
    filts.map((f) => [f.op, ["get", f.var], parseInt(f.val)])
  );
};

const updateHex = (parVals, filts, colorByObj, updateMap = true) => {
  if (mapLoaded) {
    hex.features.forEach((ft, i) => {
      hex.features[i].properties.profit = objective(ft.properties, parVals);
    });
    if (updateMap) {
      map.setFilter("hex", filter(filts));
      map.setFilter("hex_label", filter(filts));
      map.getSource("hex").setData(hex);
      map.setPaintProperty("hex", "fill-color", [
        "interpolate",
        ["linear"],
        ["get", colorByObj.var],
        colorByObj.min,
        colorByObj.minCol,
        colorByObj.max,
        colorByObj.maxCol,
      ]);
    }
  }
};
