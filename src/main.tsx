import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

import { BrowserRouter } from "react-router-dom";
import { SearchProvider } from "./context/SearchContextProps ";
import { ProductProvider } from "./context/ProductProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </ProductProvider>
    </BrowserRouter>
  </React.StrictMode>
);
