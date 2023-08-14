import "reflect-metadata";
import React from "react";
import ReactDOM from "react-dom/client";
import CreatePassenger from "./CreatePassenger.tsx";
import CreateDriver from "./CreateDriver.tsx";
import "./index.css";

import { container } from "./ioc/ioc.ts";
import { Provider } from "./ioc/ioc.react.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider container={container}>
      <CreateDriver />
      <CreatePassenger />
    </Provider>
  </React.StrictMode>
);
