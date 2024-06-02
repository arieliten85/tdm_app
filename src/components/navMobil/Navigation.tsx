import React, { ReactNode, useState } from "react";
import {
  IoMdHome,
  IoMdSearch,
  IoMdCart,
  IoMdHeart,
  IoMdContact,
} from "react-icons/io";
import "./Navigation.scss"; // Asegúrate de que este archivo esté en el mismo directorio

export const Navigation = () => {
  return (
    <header className="header" id="header">
      <nav className="navbar container">
        <a href="./index.html" className="brand">
          Brand
        </a>
        <div className="menu" id="menu">
          <ul className="menu-list">
            <MenuItem href="#" icon={<IoMdHome />} name="Home" isActive />
            <MenuItem href="#" icon={<IoMdSearch />} name="Search" />
            <MenuItem href="#" icon={<IoMdCart />} name="Cart" />
            <MenuItem href="#" icon={<IoMdHeart />} name="Favorite" />
            <MenuItem href="#" icon={<IoMdContact />} name="Account" />
          </ul>
        </div>
      </nav>
    </header>
  );
};

interface MenuItemProps {
  href: string;
  icon: ReactNode; // Definición explícita del tipo de la prop icon
  name: string;
  isActive?: boolean;
}

const MenuItem = ({ href, icon, name, isActive = false }: MenuItemProps) => {
  const [active, setActive] = useState(isActive);

  const handleClick = () => {
    // Establecer todos los enlaces en inactivo
    document
      .querySelectorAll(".menu-link")
      .forEach((link) => link.classList.remove("is-active"));
    // Establecer el enlace actual en activo
    setActive(true);
  };

  return (
    <li className="menu-item">
      <a
        href={href}
        className={`menu-link ${active ? "is-active" : ""}`}
        onClick={handleClick}
      >
        <i className="menu-icon">{icon}</i>
        <span className="menu-name">{name}</span>
      </a>
    </li>
  );
};
