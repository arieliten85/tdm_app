import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./breadcrumb.scss";

export const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="breadcrumb">
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        {pathnames.map((value, index) => {
          const decodedValue = decodeURIComponent(value);
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isActive = index === pathnames.length - 1;
          return (
            <li key={to} className={isActive ? "active" : ""}>
              {isActive ? (
                <span>{decodedValue}</span>
              ) : (
                <Link to={to}>{decodedValue}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
