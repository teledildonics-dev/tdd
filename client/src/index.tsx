import React, { FC, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

import { LovenseDevicesPage } from "./pages/lovense-devices";
import { ScrapPage } from "./reconciliation/scrap";

import "./common.scss";
import { useLovense } from "./hooks/lovense";
import { deviceProfile } from "./lovense/lovense";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <p>
            Where are you?
          </p>
        </Route>

        <Route exact path="/lovense-devices">
          <LovenseDevicesPage />
        </Route>

        <Route exact path="/scrap">
          <ScrapPage />
        </Route>

        <Route path="/vibe">
          <VibePinkPage />
        </Route>

        <Route>
          404
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

const VibePinkPage: FC = () => {
  document.title =
    "vibe.pink - online vibrator using your phone, game controller, or sex toys";

  const [allDevices, setAllDevices] = useState<readonly BluetoothDevice[]>();

  if (!allDevices) {
    navigator.bluetooth.getDevices().then(setAllDevices);
  }

  const [allGamepads, setAllGamepads] = useState(
    () => [...navigator.getGamepads()].filter(Boolean),
  );

  return (
    <main className="VibePinkPage">
      <section className="AddDevice">
        <button
          onClick={async () => {
            await navigator.bluetooth.requestDevice(deviceProfile);
            navigator.bluetooth.getDevices().then(setAllDevices);
          }}
        >
          Add Bluetooth Toy
        </button>{" "}
        <button
          onClick={() => {
            setAllGamepads([...navigator.getGamepads()].filter(Boolean));
          }}
        >
          Add Game Controller
        </button>{" "}
        <button>
          Add This Phone
        </button>
      </section>

      <section className="Devices">
        <h2>Bluetooth Toys</h2>
        {allDevices?.map((device) => (
          <div key={device.id}>
            <PinkDevice device={device} />
          </div>
        ))}
      </section>

      <section className="Devices">
        <h2>Game Controllers</h2>
        {allGamepads?.map((gamepad) => (
          <div key={gamepad!.id}>
            {gamepad!.id}
          </div>
        ))}
      </section>

      <section className="Control">
        <button
          onClick={(clickEvent) => {
            please();
          }}
        >
          Please Please Me
        </button>
      </section>
    </main>
  );
};

const PinkDevice: FC<{ device: BluetoothDevice }> = (
  { device },
) => {
  const lovense = useLovense(device);
  return (
    <>
      <label>
        <input type="checkbox" defaultChecked={true} /> {device.name}{" "}
        <code>
          {[...atob(device.id)].map((b) =>
            b.charCodeAt(0).toString(16).padStart(2, "0")
          ).join("").slice(0, 4)}
        </code>
      </label>
      <section>
        <button
          onClick={() => {
            lovense?.connect();
          }}
        >
          connect
        </button>

        <button
          onClick={() => {
            lovense?.disconnect();
          }}
        >
          disconnect
        </button>
      </section>
    </>
  );
};

const please = () => {
  navigator.bluetooth.getDevices();
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector("main#app"),
);

import.meta.hot?.accept();
