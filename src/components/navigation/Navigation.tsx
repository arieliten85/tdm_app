import React, { useState, useEffect } from "react";
import "./navigation.scss";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook para obtener la ubicación actual
  const [menuActive, setMenuActive] = useState(false);
  const [menuProductActive, setMenuProductActive] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(true);
  const [searchValue, setSearchValue] = useState<string>("");

  const toggleMenu = () => {
    setMenuActive(!menuActive);
    setMenuProductActive(false);
  };
  const toggleMenuProducts = () => {
    setMenuProductActive(!menuProductActive);
  };

  const closeMenu = () => {
    setMenuProductActive(false);
    setMenuActive(false);
  };

  // EFECTO HIDE SEARCH
  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        setIsSearchVisible(false);
      } else {
        setIsSearchVisible(true);
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = () => {
    if (searchValue) {
      navigate(`/search/?q=${searchValue}`);
      setSearchValue("");
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="header" id="header">
      <nav className="navbar container">
        <div className="container-brand">
          <Link to={"/"}>
            <span className="brand">TodoDulceMary</span>
          </Link>
        </div>
        <div className={`menu ${menuActive ? "is-active" : ""}`} id="menu">
          <ul className="menu-inner">
            <li className="menu-item">
              <Link
                to="/"
                onClick={closeMenu}
                className={`menu-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                inicio
              </Link>
            </li>

            <li
              className="menu-item menu-item-product"
              onClick={toggleMenuProducts}
            >
              <p
                className={`menu-link  ${
                  location.pathname === "/productos" ? "active" : ""
                }`}
              >
                Productos
              </p>
              <FaChevronDown />

              <ul
                className={`subMenu-productos ${
                  menuProductActive ? "subMenu-productos-active" : ""
                }`}
              >
                <li>
                  <Link to={"/tematicas"} onClick={closeMenu}>
                    <p>tortas tematicas</p>
                  </Link>
                </li>
                <li>
                  <Link to={"/budines"} onClick={closeMenu}>
                    <p>budines</p>
                  </Link>
                </li>
              </ul>
            </li>

            <li className="menu-item">
              <Link
                to="/galeria"
                onClick={closeMenu}
                className={`menu-link ${
                  location.pathname === "/galeria" ? "active" : ""
                }`}
              >
                Galeria
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/comoComprar"
                onClick={closeMenu}
                className={`menu-link ${
                  location.pathname === "/comoComprar" ? "active" : ""
                }`}
              >
                Como comprar
              </Link>
            </li>
            <li className="menu-item" onClick={closeMenu}>
              <Link
                to="/nosotros"
                className={`menu-link ${
                  location.pathname === "/nosotros" ? "active" : ""
                }`}
              >
                Nosotros
              </Link>
            </li>
          </ul>
        </div>
        <div className={`search ${!isSearchVisible ? "search-hide" : ""}`}>
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
              <p className="  ir-search" onClick={handleSearch}>
                IR
              </p>
            )}
          </div>
        </div>
        <div
          className={`burger ${menuActive ? "is-active" : ""}`}
          id="burger"
          onClick={toggleMenu}
        >
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </div>
      </nav>
    </header>
  );
};
