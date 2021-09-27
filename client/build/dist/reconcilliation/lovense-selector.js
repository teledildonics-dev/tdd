import React, {useEffect, useState} from "../../_snowpack/pkg/react.js";
import {deviceProfile} from "../lovense/lovense.js";
import BluetoothSelector, {
  buttonStyles
} from "../components/bluetooth-selector.js";
import {LovenseDevice} from "./lovense-device.js";
import {LovenseFake} from "./lovense-fake.js";
export const LovenseSelector = ({onChange}) => {
  const [lovense, setLovense] = useState();
  const [info, setInfo] = useState();
  useEffect(() => {
    if (!lovense) {
      return lovense;
    }
    let abortion = new AbortController();
    lovense.info().then((info2) => {
      if (abortion.signal.aborted) {
        return;
      }
      setInfo(info2);
    });
    return () => {
      abortion.abort();
    };
  }, [lovense]);
  if (!lovense) {
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(BluetoothSelector, {
      options: deviceProfile,
      onChange: (event) => {
        setInfo(void 0);
        const device = event.target.value;
        if (device) {
          const lovense2 = new LovenseDevice(device);
          setLovense(lovense2);
          onChange(lovense2);
        } else {
          setLovense(void 0);
          onChange(lovense);
        }
      }
    }), " ", /* @__PURE__ */ React.createElement("button", {
      style: {
        ...buttonStyles,
        background: "#FEB",
        cursor: "pointer",
        flexDirection: "column"
      },
      onClick: (_event) => {
        setInfo(void 0);
        const lovense2 = new LovenseFake();
        setLovense(lovense2);
        onChange(lovense2);
      }
    }, "Simulate Device", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      style: {fontSize: ".75em"}
    }, "(for interface testing)")));
  } else {
    let description = info ? JSON.stringify(info) : lovense.toString();
    return /* @__PURE__ */ React.createElement("div", null, "selected ", description);
  }
};
