import React, {useCallback, useEffect, useState} from "../../_snowpack/pkg/react";
import {useLovense} from "../hooks/lovense.js";
import {useThrottledChanges} from "../hooks/throttle.js";
import {PatternsControl} from "./patterns.js";
import {PatternDisplay, thor} from "../lovense/patterns.js";
import {useLovenseDebug} from "../hooks/lovense-debug.js";
export const DeviceControl = ({device}) => {
  const [targetVibrationLevel, setTargetVibrationLevel] = useState(0);
  const targetVibrationPower = targetVibrationLevel / 20;
  const throttledTargetVibrationPower = useThrottledChanges(500, targetVibrationPower);
  const [targetRotationLevel, setTargetRotationLevel] = useState(0);
  const targetRotationPower = targetRotationLevel / 20;
  const throttledTargetRotationPower = useThrottledChanges(500, targetRotationPower);
  const [info, setInfo] = useState();
  const [batch, setBatch] = useState();
  const [battery, setBattery] = useState();
  const [patterns, setPatterns] = useState();
  const lovense = useLovense(device, void 0, useCallback(() => {
    setTargetVibrationLevel(0);
    setTargetRotationLevel(0);
  }, []));
  useLovenseDebug(lovense);
  useEffect(() => {
    if (!lovense) {
      return;
    }
    const info2 = lovense.info();
    info2.then((info3) => {
      if (!lovense) {
        return;
      }
      setInfo(info3);
      if (info3.capabilities.patterns) {
        lovense.patterns().then(setPatterns);
      }
    });
    lovense.batch().then(setBatch);
    lovense.battery().then(setBattery);
    let batteryPollInterval = setInterval(() => {
      if (!lovense) {
        return;
      }
      lovense.battery().then(setBattery);
    }, 60 * 1e3);
    return () => {
      clearInterval(batteryPollInterval);
    };
  }, [lovense]);
  useEffect(() => {
    if (!(lovense && info)) {
      return;
    }
    if (!info.capabilities.vibration) {
      return;
    }
    lovense.vibrate(throttledTargetVibrationPower);
  }, [lovense, info, throttledTargetVibrationPower]);
  useEffect(() => {
    if (!(lovense && info)) {
      return;
    }
    if (!info.capabilities.rotation) {
      return;
    }
    lovense.rotate(throttledTargetRotationPower);
  }, [lovense, info, throttledTargetRotationPower]);
  const [pattern] = useState(() => thor);
  const [patternEnabled, setPatternEnabled] = useState();
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!(info && patternEnabled)) {
      return;
    }
    const startTime = Date.now();
    const intervalId = setInterval(() => {
      const t2 = (Date.now() - startTime) / 1e3;
      setT(t2);
      const x = pattern(t2);
      setTargetVibrationLevel(x * 20);
      setTargetRotationLevel(x * 20);
    }, 1e3 / 60);
    return () => {
      clearInterval(intervalId);
    };
  }, [info, pattern, patternEnabled]);
  if (!lovense) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, " ", /* @__PURE__ */ React.createElement("div", {
      style: {
        boxSizing: "border-box",
        border: "1px solid black",
        color: "#000",
        background: "#F8D8C8",
        minHeight: "40px",
        width: "128px",
        fontSize: "14px",
        fontFamily: "sans-serif",
        padding: "4px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        cursor: "default",
        borderRadius: "4px",
        borderTopLeftRadius: 0,
        verticalAlign: "top"
      }
    }, "connecting..."));
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, " ", /* @__PURE__ */ React.createElement("div", {
    style: {
      display: "inline-flex",
      boxSizing: "border-box",
      border: "1px solid black",
      color: "#000",
      background: "#F8F8F8",
      minHeight: "40px",
      width: "350px",
      fontSize: "14px",
      fontFamily: "sans-serif",
      padding: "4px",
      alignItems: "center",
      justifyContent: "start",
      flexDirection: "column",
      cursor: "default",
      borderRadius: "4px",
      verticalAlign: "top"
    }
  }, /* @__PURE__ */ React.createElement("div", {
    style: {
      marginBottom: "8px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "start",
      alignItems: "center"
    }
  }, /* @__PURE__ */ React.createElement("span", {
    style: {
      fontSize: "30px",
      fontWeight: "bold",
      fontFamily: "Trebuchet MS"
    }
  }, info ? info.model : device.name), info && batch && /* @__PURE__ */ React.createElement("div", {
    style: {
      margin: "0 12px",
      textAlign: "center",
      display: "inline-block",
      fontSize: "12px",
      fontWeight: "normal",
      lineHeight: "10px"
    }
  }, batch, info.serial, " ", /* @__PURE__ */ React.createElement("br", null), "running firmware ", info.firmware), battery != null && /* @__PURE__ */ React.createElement("div", {
    onClick: () => lovense.battery().then(setBattery),
    style: {cursor: "pointer"}
  }, Math.floor(battery * 100), "%", /* @__PURE__ */ React.createElement("span", {
    role: "img",
    "aria-label": "Battery"
  }, "🔋"))), lovense && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      justifyContent: "flex-end",
      flexDirection: "row",
      height: "56px"
    }
  }, /* @__PURE__ */ React.createElement("span", {
    role: "img",
    "aria-label": "Stop",
    style: {
      fontSize: "3em",
      cursor: "pointer"
    },
    onClick: () => {
      setTargetRotationLevel(0);
      setTargetVibrationLevel(0);
      lovense.stop();
    }
  }, "🛑"), /* @__PURE__ */ React.createElement("code", {
    style: {
      verticalAlign: "top",
      margin: "4px",
      fontSize: "16px",
      whiteSpace: "pre",
      fontFamily: "consolas, monospace"
    }
  }, Math.floor(targetVibrationPower * 100).toString().padStart(3), "%"), /* @__PURE__ */ React.createElement("input", {
    value: targetVibrationLevel,
    min: "0",
    max: "20",
    type: "range",
    onChange: (event) => {
      const level = Number(event.target.value);
      setTargetVibrationLevel(level);
    },
    style: {
      cursor: "pointer",
      width: "225px",
      transform: "scaleY(2.0)"
    }
  })), info && info.capabilities.rotation && /* @__PURE__ */ React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      justifyContent: "flex-end",
      flexDirection: "row",
      height: "56px"
    }
  }, /* @__PURE__ */ React.createElement("span", null, "rotation:"), /* @__PURE__ */ React.createElement("code", {
    style: {
      verticalAlign: "top",
      margin: "4px",
      fontSize: "16px",
      whiteSpace: "pre",
      fontFamily: "consolas, monospace"
    }
  }, Math.floor(targetRotationPower * 100).toString().padStart(3), "%"), /* @__PURE__ */ React.createElement("input", {
    value: targetRotationLevel,
    min: "-20",
    max: "20",
    type: "range",
    onChange: (event) => {
      const level = Number(event.target.value);
      setTargetRotationLevel(level);
    },
    style: {
      cursor: "pointer",
      width: "225px",
      transform: "scaleY(2.0)"
    }
  })), info && info.capabilities.patterns && patterns && /* @__PURE__ */ React.createElement(PatternsControl, {
    lovense,
    patterns: patterns.slice(0, info.capabilities.patterns)
  }), info && pattern && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(PatternDisplay, {
    pattern,
    x: t,
    height: 100
  }), /* @__PURE__ */ React.createElement("button", {
    onClick: () => setPatternEnabled(!patternEnabled)
  }, "run")))));
};
