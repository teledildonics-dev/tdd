import React, { FC } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import { LovenseDevicesPage } from "./pages/lovense-devices";
import { ScrapPage } from "./reconcilliation/scrap";

import "./common.scss";

const routes: { [_: string]: FC } = {
  "/lovense-devices": LovenseDevicesPage,
  "/scrap": ScrapPage,
};

const App: FC = () => {
  return (
    <section style={{ margin: "32px", fontSize: "24px" }}>
      <h1
        style={{
          marginBottom: "24px",
        }}
      >
        <a href="/">teledildonics.dev</a>
      </h1>

      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <IndexPage />
          </Route>
          <Route exact path="/lovense-devices">
            <LovenseDevicesPage />
          </Route>
          <Route exact path="/scrap">
            <ScrapPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </section>
  );
};

export const IndexPage: FC = () => {
  return (
    <ul style={{ listStyleType: "square" }}>
      <li style={{ marginTop: "16px", marginLeft: "1em" }}>
        <a href="/lovense-devices">Lovense devices</a>
      </li>
      <li style={{ marginTop: "16px", marginLeft: "1em" }}>
        <a href="/scrap">scrap</a>
      </li>
    </ul>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
