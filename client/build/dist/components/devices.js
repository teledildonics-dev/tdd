import React, {useState} from "../../_snowpack/pkg/react.js";
import BluetoothSelector from "./bluetooth-selector.js";
import {DeviceControl} from "./lovense-control.js";
import {deviceProfile} from "../lovense/lovense.js";
export const DevicePanes = () => {
  const [device, setDevice] = useState();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("section", {
    style: {
      margin: "4px"
    }
  }, /* @__PURE__ */ React.createElement(BluetoothSelector, {
    options: deviceProfile,
    onChange: (event) => setDevice(event.target.value)
  }), device && /* @__PURE__ */ React.createElement(DeviceControl, {
    device
  })), device && /* @__PURE__ */ React.createElement(DevicePanes, null));
};
