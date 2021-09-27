import React from "../../_snowpack/pkg/react";
export const PatternsControl = ({lovense, patterns}) => {
  return /* @__PURE__ */ React.createElement("div", {
    style: {}
  }, patterns.map((pattern, index) => /* @__PURE__ */ React.createElement("div", {
    key: index.toString(),
    style: {
      cursor: "pointer",
      margin: "8px",
      background: "#FFF",
      border: "1px solid #000",
      color: "black",
      textAlign: "center",
      fontSize: "0.75em",
      wordWrap: "break-word",
      width: "325px",
      fontFamily: "monospace"
    },
    onClick: () => lovense.startPattern(index + 1)
  }, pattern.map((value, index2) => /* @__PURE__ */ React.createElement("span", {
    key: index2.toString(),
    style: {
      opacity: 0.125 + (1 - 0.125) * value,
      color: "#000",
      background: "#888"
    }
  }, Math.round(value * 9))))));
};
