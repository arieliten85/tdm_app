import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  isVisible: boolean;
  searchValue: string;
  setSearchValue: (value: string) => void;
  handleSearch: () => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  isVisible,
  searchValue,
  setSearchValue,
  handleSearch,
  handleKeyDown,
}) => {
  return (
    <div className={`search ${!isVisible ? "search-hide" : ""}`}>
      <div className="search-form">
        <input
          type="text"
          name="search"
          className="search-input"
          placeholder="Buscar"
          autoFocus
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {!searchValue ? (
          <FaSearch className="search-submit" />
        ) : (
          <p className="ir-search" onClick={handleSearch}>
            IR
          </p>
        )}
      </div>
    </div>
  );
};
