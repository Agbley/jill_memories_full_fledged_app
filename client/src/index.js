import React from "react";

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import { reducers } from "./reducers";

import App from "./App";
import "./index.css";

const container = document.getElementById("app");
const root = createRoot(container);

const middleware = [thunk]; // Add other middlewares if needed

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
