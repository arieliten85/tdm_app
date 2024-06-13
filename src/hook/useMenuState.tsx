import { useState } from "react";

export const useMenuState = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [menuProductActive, setMenuProductActive] = useState(false);

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

  return {
    menuActive,
    menuProductActive,
    toggleMenu,
    toggleMenuProducts,
    closeMenu,
  };
};
