import React from "react";
import ReactDOM from "react-dom";
import "./Styles/index.css";
import App from "./App";
import AuthProvider from "./auth/AuthProvider";
import { FilterProvider } from "./hook/useFilter";
import { RideProvider } from "./hook/useRides";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <RideProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </RideProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
