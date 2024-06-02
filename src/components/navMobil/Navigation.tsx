// Navigation.jsx
import React from "react";
import {
  IoMdHome,
  IoMdSearch,
  IoMdCart,
  IoMdHeart,
  IoMdContact,
} from "react-icons/io";
import "./Navigation.scss"; // Make sure this file is in the same directory

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

const MenuItem = ({ href, icon, name, isActive = false }) => {
  const [active, setActive] = React.useState(isActive);

  const handleClick = () => {
    // Set all links to inactive
    document
      .querySelectorAll(".menu-link")
      .forEach((link) => link.classList.remove("is-active"));
    // Set the current link to active
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
