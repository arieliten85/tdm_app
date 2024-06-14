import React from "react";
import { useLocation } from "react-router-dom";

export const useGetParamsLocation = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const valueTextParamas = searchParams.get("q");
  const minPriceParamas = searchParams.get("min_price");
  const maxPriceParamas = searchParams.get("max_price");
  const sort_byParamas = searchParams.get("sort_by");

  return {
    searchParams,
    location,
    valueTextParamas,
    minPriceParamas,
    maxPriceParamas,
    sort_byParamas,
  };
};

export function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
