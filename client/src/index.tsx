import React, { FC, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

import { LovenseDevicesPage } from "./pages/lovense-devices";
import { ScrapPage } from "./reconciliation/scrap";

import "./common.scss";

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
  document.title = "vibe.pink - online vibrator for phones and bluetooth";

  const [allDevices, setAllDevices] = useState<readonly BluetoothDevice[]>();

  if (!allDevices) {
    navigator.bluetooth.getDevices().then(setAllDevices);
  }

  return (
    <main className="VibePinkPage">
      <section className="AddDevice">
        <button
          onClick={async () => {
            await navigator.bluetooth.requestDevice({ acceptAllDevices: true });
            navigator.bluetooth.getDevices().then(setAllDevices);
          }}
        >
          Add Bluetooth Toy
        </button>{" "}
        <button>
          Add Game Controller
        </button>{" "}
        <button>
          Add This Phone
        </button>
      </section>

      <section className="Devices">
        <h2>Devices</h2>
        {allDevices?.map((x) => (
          <p key={x.id}>
            <label>
              <input type="checkbox" defaultChecked={true} /> {x.name}{" "}
              <code>
                {[...atob(x.id)].map((b) =>
                  b.charCodeAt(0).toString(16).padStart(2, "0")
                ).join("").slice(0, 4)}
              </code>
            </label>
          </p>
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
