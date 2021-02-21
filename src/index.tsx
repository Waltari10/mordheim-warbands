import React from "react";
import ReactDOM from "react-dom";

import "./styles/index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { init } from "@sentry/browser";

if (process.env.REACT_APP_ENVIRONMENT === "PRODUCTION") {
  init({ dsn: process.env.REACT_APP_SENTRY_DNS });
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();