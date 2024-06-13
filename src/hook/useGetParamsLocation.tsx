import { useLocation } from "react-router-dom";

export const useGetParamsLocation = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const valueTextParamas = searchParams.get("q");
  const minPriceParamas = searchParams.get("min_price");
  const maxPriceParamas = searchParams.get("max_price");

  return {
    searchParams,
    location,
    valueTextParamas,
    minPriceParamas,
    maxPriceParamas,
  };
};
