import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { ApiProductoProps } from '../types/types';
import {
  getProductByAscending,
  getProductByDescending,
  getProductByRangePrice,
} from '../hook/useGetProducts';
import { useProductsContext } from './ProductProvider';
import { useGetParamsLocation } from '../hook/useGetParamsLocation';

interface FilterProductsContextType {
  productsFilterd: ApiProductoProps[];
  setProductsFilterd: Dispatch<SetStateAction<ApiProductoProps[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isFilterResults: boolean;
  setIsFilerResults: Dispatch<SetStateAction<boolean>>;
}

export const FilterProductsContext = createContext<FilterProductsContextType>({
  productsFilterd: [],
  setProductsFilterd: () => [],
  isLoading: false,
  setIsLoading: () => false,
  isFilterResults: false,
  setIsFilerResults: () => false,
});

export const FilterProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  //HOOKS
  const { sort_byParamas, minPriceParamas, maxPriceParamas, searchParams } = useGetParamsLocation();

  //ESTADOS
  const { setStatus, setErrorMessage } = useProductsContext();

  const [isLoading, setIsLoading] = useState(true);

  const [isFilterResults, setIsFilerResults] = useState(false);
  const [productsFilterd, setProductsFilterd] = useState<ApiProductoProps[]>([]);

  const filterRangePrice = () => {
    //RANGE PRICE FILTER
    if (minPriceParamas && maxPriceParamas) {
      setIsLoading(true);
      const resultRange = getProductByRangePrice({
        numMin: minPriceParamas,
        numMax: maxPriceParamas,
        dataArray: productsFilterd,
      });

      if (!resultRange.length) {
        setStatus('error');
        setErrorMessage('No hay productos para este rango de precios');
      } else {
        setTimeout(() => {
          setIsLoading(false);
          setIsFilerResults(true);
          setProductsFilterd(resultRange);
        }, 550);
      }
    }
  };

  const filterOrderBy = () => {
    if (sort_byParamas?.includes('descending')) {
      setIsLoading(true);
      const OrderByResultsDescending = getProductByDescending(productsFilterd);
      setTimeout(() => {
        setIsLoading(false);
        setProductsFilterd(OrderByResultsDescending);
      }, 550);
    } else if (sort_byParamas?.includes('ascending')) {
      setIsLoading(true);
      const OrderByResultsAscending = getProductByAscending(productsFilterd);
      setTimeout(() => {
        setIsLoading(false);
        setProductsFilterd(OrderByResultsAscending);
      }, 550);
    }
  };

  useEffect(() => {
    if (searchParams.size > 0) {
      filterOrderBy();
    }

    return () => {
      setErrorMessage('');
      setStatus('success');
    };
  }, [setErrorMessage, setStatus, sort_byParamas]);

  useEffect(() => {
    filterRangePrice();
  }, [minPriceParamas, maxPriceParamas, setStatus, setErrorMessage]);

  return (
    <FilterProductsContext.Provider
      value={{
        setIsFilerResults,
        isFilterResults,
        isLoading,
        setIsLoading,
        productsFilterd,
        setProductsFilterd,
      }}
    >
      {children}
    </FilterProductsContext.Provider>
  );
};

export const useFilterProductContext = () => useContext(FilterProductsContext);
