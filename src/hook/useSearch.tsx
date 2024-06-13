import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSearch = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = () => {
    if (searchValue) {
      navigate(`/search/?q=${searchValue}`);
      setSearchValue("");
      const topElement = document.getElementById("top");
      if (topElement) {
        topElement.focus();
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return {
    searchValue,
    setSearchValue,
    handleSearch,
    handleKeyDown,
  };
};
