import React, { useState, useEffect } from "react";
import "./navigation.scss";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Navigation: React.FC = () => {
  const [menuActive, setMenuActive] = useState(false);

  const [searchVisible, setSearchVisible] = useState(true);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const closeMenu = () => {
    setMenuActive(false);
  };

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        setSearchVisible(false);
      } else {
        setSearchVisible(true);
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="header" id="header">
      <nav className="navbar container">
        <div className="container-brand">
          <span className="brand">TodoDulceMary</span>
        </div>
        <div className={`menu ${menuActive ? "is-active" : ""}`} id="menu">
          <ul className="menu-inner">
            <li className="menu-item">
              <Link to={"/"} onClick={closeMenu}>
                <p className="menu-link">inicio</p>
              </Link>
            </li>
            <li className="menu-item">
              <Link to={"/galeria"} onClick={closeMenu}>
                <p className="menu-link">Galeria</p>
              </Link>
            </li>
            <li className="menu-item">
              <Link to={"/comoComprar"} onClick={closeMenu}>
                <p className="menu-link"> Como comprar</p>
              </Link>
            </li>
            <li className="menu-item" onClick={closeMenu}>
              <Link to={"/nosotros"}>
                <p className="menu-link">Nosotros</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className={`search ${!searchVisible ? "search-hide" : ""}`}>
          <form className="search-form">
            <input
              type="text"
              name="search"
              className="search-input"
              placeholder="Buscar"
              autoFocus
            />
            <button type="submit" className="search-submit" disabled>
              <FaSearch />
            </button>
          </form>
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
