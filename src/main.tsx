import "./index.css";
import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import routesConfig from "./utils/routerConfig";
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
