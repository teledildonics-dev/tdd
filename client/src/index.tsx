import React, { FC } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

import { LovenseDevicesPage } from "./pages/lovense-devices";
import { ScrapPage } from "./reconcilliation/scrap";

import "./common.scss";

const App: FC = () => {
  return (
    <BrowserRouter>
      <section style={{ margin: "32px", fontSize: "24px" }}>
        <h1
          style={{
            marginBottom: "24px",
          }}
        >
          <Link to="/">teledildonics.dev</Link>
        </h1>

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
      </section>
    </BrowserRouter>
  );
};

export const IndexPage: FC = () => {
  return (
    <ul style={{ listStyleType: "square" }}>
      <li style={{ marginTop: "16px", marginLeft: "1em" }}>
        <Link to="/lovense-devices">Lovense devices</Link>
      </li>
      <li style={{ marginTop: "16px", marginLeft: "1em" }}>
        <Link to="/scrap">scrap</Link>
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
