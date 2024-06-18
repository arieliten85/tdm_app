import { NotFoundData, ShowSpinner, TitleCategory } from '../components/utililidades/Components';

import ProductsList from '../components/ProductList/ProductList';
import { Breadcrumb } from '../components/breadcrumbs/Breadcrumbs';
import { useProductsContext } from '../context/ProductProvider';
import { useGetParamsLocation } from '../hook/useGetParamsLocation';
import { useEffect, useState } from 'react';
import { getProductByTitle } from '../hook/useGetProducts';
import { ApiProductoProps } from '../types/types';

export const SearchPage = () => {
  const { status, products, errorMessage } = useProductsContext();
  const [productsFilterd, setProductsFilterd] = useState<ApiProductoProps[]>([]);
  const { valueTextParamas } = useGetParamsLocation();

  useEffect(() => {
    if (valueTextParamas) {
      const searchResults = getProductByTitle(valueTextParamas);
      setProductsFilterd(searchResults);
    }
  }, [valueTextParamas, productsFilterd]);

  if (status === 'loading') {
    return <ShowSpinner />;
  }

  return (
    <>
      <div className="productos-home ">
        <div className="w-100 d-flex flex-column justify-content-center align-items-center">
          <TitleCategory title="Productos" />
          <Breadcrumb />

          {errorMessage && status === 'error' ? (
            <NotFoundData />
          ) : (
            <>
              <ProductsList productos={productsFilterd ? productsFilterd : products} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
