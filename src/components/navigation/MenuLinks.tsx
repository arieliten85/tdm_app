import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';

interface SubRoute {
  path: string;
  label: string;
}

interface Route {
  path: string;
  label: string;
  subRoutes?: SubRoute[];
}

interface MenuProps {
  routes: Route[];
  menuProductActive: boolean;
  toggleMenuProducts: () => void;
  closeMenu: () => void;
}

export const MenuLinks: React.FC<MenuProps> = ({
  routes,
  menuProductActive,
  toggleMenuProducts,
  closeMenu,
}) => {
  const location = useLocation();

  return (
    <ul className="menu-inner">
      {routes.map(route =>
        route.subRoutes ? (
          <li key={route.path} className="menu-item menu-item-product" onClick={toggleMenuProducts}>
            <p className={`menu-link ${location.pathname.startsWith(route.path) ? 'active' : ''}`}>
              {route.label}
            </p>
            <FaChevronDown />
            <ul
              className={`subMenu-productos p-  ${
                menuProductActive ? 'subMenu-productos-active' : ''
              }`}
            >
              {route.subRoutes.map(subRoute => (
                <li key={subRoute.path} className="border-bottom">
                  <Link to={subRoute.path} onClick={closeMenu}>
                    <p>{subRoute.label}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ) : (
          <li key={route.path} className="menu-item">
            <Link
              to={route.path}
              onClick={closeMenu}
              className={`menu-link ${location.pathname === route.path ? 'active' : ''}`}
            >
              {route.label}
            </Link>
          </li>
        ),
      )}
    </ul>
  );
};
