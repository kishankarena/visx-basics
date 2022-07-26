import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import ParentSize from "@visx/responsive/lib/components/ParentSizeModern";
import TemperatureBarStack from "./components/TemperatureBarStack";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <ParentSize>
    {({ width, height }) => {
      return <TemperatureBarStack width={width} height={height} />;
    }}
  </ParentSize>
);
