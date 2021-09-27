import * as __SNOWPACK_ENV__ from '../_snowpack/env.js';
import.meta.env = __SNOWPACK_ENV__;

import React from "../_snowpack/pkg/react.js";
import ReactDOM from "../_snowpack/pkg/react-dom.js";
import {BrowserRouter, Switch, Route} from "../_snowpack/pkg/react-router-dom.js";
import {LovenseDevicesPage} from "./pages/lovense-devices.js";
import {ScrapPage} from "./reconcilliation/scrap.js";
import "./common.css.proxy.js";
const routes = {
  "/lovense-devices": LovenseDevicesPage,
  "/scrap": ScrapPage
};
const App = () => {
  return /* @__PURE__ */ React.createElement("section", {
    style: {margin: "32px", fontSize: "24px"}
  }, /* @__PURE__ */ React.createElement("h1", {
    style: {
      marginBottom: "24px"
    }
  }, /* @__PURE__ */ React.createElement("a", {
    href: "/"
  }, "teledildonics.dev")), /* @__PURE__ */ React.createElement(BrowserRouter, null, /* @__PURE__ */ React.createElement(Switch, null, /* @__PURE__ */ React.createElement(Route, {
    exact: true,
    path: "/"
  }, /* @__PURE__ */ React.createElement(IndexPage, null)), /* @__PURE__ */ React.createElement(Route, {
    exact: true,
    path: "/lovense-devices"
  }, /* @__PURE__ */ React.createElement(LovenseDevicesPage, null)), /* @__PURE__ */ React.createElement(Route, {
    exact: true,
    path: "/scrap"
  }, /* @__PURE__ */ React.createElement(ScrapPage, null)))));
};
export const IndexPage = () => {
  return /* @__PURE__ */ React.createElement("ul", {
    style: {listStyleType: "square"}
  }, /* @__PURE__ */ React.createElement("li", {
    style: {marginTop: "16px", marginLeft: "1em"}
  }, /* @__PURE__ */ React.createElement("a", {
    href: "/lovense-devices"
  }, "Lovense devices")), /* @__PURE__ */ React.createElement("li", {
    style: {marginTop: "16px", marginLeft: "1em"}
  }, /* @__PURE__ */ React.createElement("a", {
    href: "/scrap"
  }, "scrap")));
};
ReactDOM.render(/* @__PURE__ */ React.createElement(React.StrictMode, null, /* @__PURE__ */ React.createElement(App, null)), document.getElementById("root"));
if (undefined /* [snowpack] import.meta.hot */ ) {
  undefined /* [snowpack] import.meta.hot */ .accept();
}
