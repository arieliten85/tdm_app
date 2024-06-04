import "./navigation.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export const Navigation = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const closeMenu = () => {
    setMenuActive(false);
  };

  return (
    <header className="header" id="header">
      <nav className="navbar container">
        <div className="container-brand">
          <Link to="/" className="menu-link">
            <span className="brand">TodoDulceMary</span>
          </Link>
        </div>
        <div className={`menu ${menuActive ? "is-active" : ""}`} id="menu">
          <ul className="menu-inner">
            <li className="menu-item">
              <Link to="/" className="menu-link" onClick={closeMenu}>
                Inicio
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/productos" className="menu-link" onClick={closeMenu}>
                Productos
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/comoComprar" className="menu-link" onClick={closeMenu}>
                Cómo comprar
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/nosotros" className="menu-link" onClick={closeMenu}>
                Nosotros
              </Link>
            </li>
          </ul>
        </div>
        <div className="search">
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
