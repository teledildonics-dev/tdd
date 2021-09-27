import React, {useState} from "../../_snowpack/pkg/react";
import {BluetoothLogo} from "./bluetooth-logo.js";
export const buttonStyles = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  border: "1px solid black",
  color: "#000",
  background: "#DDE",
  height: "40px",
  width: "150px",
  fontSize: "14px",
  fontFamily: "sans-serif",
  padding: "4px",
  cursor: "default",
  borderRadius: "4px",
  verticalAlign: "top",
  position: "relative",
  overflow: "hidden"
};
export const BluetoothSelector = ({onChange, options = {acceptAllDevices: true}, style = {}}) => {
  const [device, setDevice] = useState();
  const [requested, setRequested] = useState(false);
  if (!requested) {
    return /* @__PURE__ */ React.createElement("button", {
      style: {...buttonStyles, cursor: "pointer", ...style},
      onClick: async () => {
        const request = navigator.bluetooth.requestDevice(options);
        setRequested(true);
        try {
          const device2 = await request;
          setDevice(device2);
          onChange({target: {value: device2}});
        } catch (error) {
          console.error(error);
          setRequested(false);
        }
      }
    }, /* @__PURE__ */ React.createElement(BluetoothLogo, null), "   Select Device");
  } else if (!device) {
    return /* @__PURE__ */ React.createElement("button", {
      disabled: true,
      style: {...buttonStyles, background: "#AAB", color: "#444", ...style}
    }, /* @__PURE__ */ React.createElement(BluetoothLogo, null), "   Selecting...");
  } else {
    return /* @__PURE__ */ React.createElement("span", {
      style: {...buttonStyles, background: "#BDC", ...style}
    }, /* @__PURE__ */ React.createElement("span", {
      style: {
        background: "#DBB",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontWeight: "bold",
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: "32px",
        textAlign: "center",
        borderRight: "1px solid black",
        fontSize: "2em"
      },
      onClick: () => {
        setDevice(void 0);
        setRequested(false);
        onChange({target: {value: void 0}});
      }
    }, "×"), /* @__PURE__ */ React.createElement("span", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        left: "32px",
        textAlign: "center"
      }
    }, /* @__PURE__ */ React.createElement(BluetoothLogo, null), "   ", device.name));
  }
};
export default BluetoothSelector;
