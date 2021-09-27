import {useState} from "../../_snowpack/pkg/react";
import React from "../../_snowpack/pkg/react";
import {LovenseSelector} from "./lovense-selector.js";
import {useLovense} from "./use-lovense.js";
export const ScrapPage = () => {
  const [lovenseInternal, setLovense] = useState();
  const lovense = useLovense(lovenseInternal);
  let controls;
  if (lovense) {
    controls = /* @__PURE__ */ React.createElement("form", null, /* @__PURE__ */ React.createElement("label", null, "Vibration", /* @__PURE__ */ React.createElement("input", {
      type: "range",
      defaultValue: "0",
      min: "0",
      max: "20",
      onChange: (event) => {
        lovense.setVibration(Number(event.target.value));
      }
    })), /* @__PURE__ */ React.createElement("label", null, "Rotation", /* @__PURE__ */ React.createElement("input", {
      type: "range",
      defaultValue: "0",
      min: "-20",
      max: "20",
      onChange: (event) => {
        lovense.setRotation(Number(event.target.value));
      }
    })));
  } else {
    controls = null;
  }
  return /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement(LovenseSelector, {
    onChange: setLovense
  }), controls);
};
