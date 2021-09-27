import React from "../../_snowpack/pkg/react.js";
import {DevicePanes} from "../components/devices.js";
export const LovenseDevicesPage = () => {
  return /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement("div", {
    style: {
      border: "1px solid black",
      color: "#000",
      background: "#FFF8F0",
      fontSize: "12px",
      fontFamily: "sans-serif",
      padding: "10px",
      borderRadius: "4px",
      display: "inline-block",
      margin: "4px",
      float: "right",
      lineHeight: "18px"
    }
  }, "teledildonics.dev: my remote control playground. ", /* @__PURE__ */ React.createElement("br", null), "Buggy, unstable, and unofficial. ", /* @__PURE__ */ React.createElement("br", null), "Open your developer console to see more.", /* @__PURE__ */ React.createElement("br", null), "Only supports some", " ", /* @__PURE__ */ React.createElement("a", {
    href: "https://www.lovense.com/compare"
  }, "Lovense"), " ", "devices."), /* @__PURE__ */ React.createElement(DevicePanes, null));
};
