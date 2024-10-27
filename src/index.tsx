import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { RootReducer } from "./store/RootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import RTCMiddleware from "./store/RTCMiddleware";

const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(thunk, RTCMiddleware))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
