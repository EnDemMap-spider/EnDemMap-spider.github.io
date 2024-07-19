/* global Vue _ jsyaml */

import {
  getModel,
  getHex,
  updateHex,
  reloadHex,
  deleteDrawing,
  toObj,
  toObjSingle,
  toObjArr,
  fmt,
  zip,
  updatePaint,
  getColorByMinMax,
  downloadHex,
  downloadLines,
  setDrawing,
} from "./funcs.js";

import { makeMap, makeDraw } from "./map.js";

<<<<<<< HEAD
const validPaths = ["hex", "zambia2", "UNUSED"];
=======
// *********************************************
// MAKE SURE TO ADD YOUR MODEL NAME HERE
// If you don't, it won't show up on the website
// *********************************************
const models = ["zambia", "zambia2"];
// *********************************************
// *********************************************
>>>>>>> ac0aa98c4fa1d62cf48c82b2f813a2df630ed6da

const initApp = (config) => {
  Vue.createApp({
    data() {
      return {
        hex: {},
        models,
        name: config.name,
        pars: config.pars,
        infra: config.infra,
        mapLoaded: false,
        idLabels: false,
        scaleColors: true,
        attrs: toObj(config.attrs),
        colorBy: config.attrs[0].col,
        drawing: null,
        drawnLines: toObjArr(config.infra),
      };
    },
    computed: {
      idLabelsText: function () {
        return this.idLabels ? "visible" : "none";
      },
      parVals: function () {
        return toObjSingle(this.pars, "val");
      },
      colorByObj: function () {
        return this.attrs[this.colorBy];
      },
      colorByMinMax: function () {
        const minMax = getColorByMinMax(
          this.colorByObj,
          this.scaleColors,
          this.hex
        );
        return { min: fmt(minMax.min), max: fmt(minMax.max) };
      },
      colorBarStyle: function () {
        const from = this.colorByObj.minCol;
        const to = this.colorByObj.maxCol;
        return `linear-gradient(to right, ${from}, ${to})`;
      },
    },
    watch: {
      idLabels: function () {
        this.map.setLayoutProperty(
          "hex_label",
          "visibility",
          this.idLabelsText
        );
      },
      scaleColors: function () {
        updatePaint(this.colorByObj, this.map, this.scaleColors, this.hex);
      },
      parVals: function () {
        this.debouncedUpdate();
      },
      colorBy: function () {
        updatePaint(this.colorByObj, this.map, this.scaleColors, this.hex);
      },
    },
    created: async function () {
      this.debouncedUpdate = _.debounce(this.update, 500);

      this.model = await getModel(config);

      this.hex = await getHex(config, this.infra, this.parVals, this.model);
      this.map = makeMap(config, this, this.model);
      this.draw = makeDraw(this.map, this, config, this.model);
    },
    methods: {
      zip: function (a, b) {
        return zip(a, b);
      },
      doDraw: function (col) {
        if (this.drawing == col) {
          this.drawing = null;
        } else {
          this.drawing = col;
        }
        setDrawing(this.drawing, this.draw, this.infra);
      },
      deleteDraw: function (col) {
        deleteDrawing(
          col,
          this.map,
          this,
          this.draw,
          this.drawnLines,
          this.mapLoaded,
          this.model
        );
        this.drawing = null;
      },
      update: function () {
        this.hex = updateHex(this.parVals, this.hex, this.model);
        reloadHex(this.map, this.hex, this.mapLoaded);
      },
      downloadHex: function () {
        downloadHex(this.hex, config);
      },
      downloadLines: function () {
        downloadLines(this.drawnLines, config);
      },
    },
  }).mount("#sidebar");
};

(async () => {
  let path = window.location.pathname.split("/")[1];
<<<<<<< HEAD
  path = validPaths.includes(path) ? path : "hex";
=======
  path = models.includes(path) ? path : "zambia";
>>>>>>> ac0aa98c4fa1d62cf48c82b2f813a2df630ed6da
  const confFile = await (await fetch(`./config/${path}.yml`)).text();
  const config = jsyaml.load(confFile);
  initApp(config);
})();
