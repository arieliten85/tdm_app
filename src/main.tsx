import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

import { BrowserRouter } from 'react-router-dom';

import { ProductProvider } from './context/ProductProvider';
import { FilterProductsProvider } from './context/FilterProductsProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductProvider>
        <FilterProductsProvider>
          <App />
        </FilterProductsProvider>
      </ProductProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
