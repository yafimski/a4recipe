import "./index.css";
import React from "react";

import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routesConfig from "../src/test-utils/mockRouter";

import { Provider } from "react-redux";
import { store } from "./state/store";

const router = createBrowserRouter(routesConfig);

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
