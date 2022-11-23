import React from "react";
import ReactDOM from "react-dom/client";
import { ProviderFuelList } from "./contexts/FuelListContext";
import { CurrentPositionProvider } from "./contexts/CurrentPositionContext";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ProviderFuelList>
      <CurrentPositionProvider>
        <App />
      </CurrentPositionProvider>
    </ProviderFuelList>
  </React.StrictMode>
);
