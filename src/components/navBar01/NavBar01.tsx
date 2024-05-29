import { useState } from "react";
import "../navBar01/NavBar01.scss";
import { Link } from "react-router-dom";
import { navigationLinks } from "./api";

export const NavBar01 = () => {
  const [isActive, setIsActive] = useState(false);
  const [focused, setFocused] = useState(0);
  const handleToggle = () => {
    setIsActive(!isActive);
  };
  const clicked = (index: number) => {
    setFocused(index);
  };

  return (
    <>
      <header className="header" data-test="header">
        <div className="navContainer">
          <span className="logo" data-test="logo">
            React Navigation
          </span>
          <nav>
            <ul
              className="linksContainer"
              style={isActive ? { transform: "translateX(0)" } : undefined}
            >
              <MapNavigationLinks clicked={clicked} focused={focused} />
            </ul>
          </nav>
          <UseToggle handleToggle={handleToggle} isActive={isActive} />
          <div
            onClick={handleToggle}
            className={`overlay ${isActive ? "active" : ""}`}
          />
        </div>
      </header>
    </>
  );
};

interface MapNavigationLinksProps {
  focused: number;
  clicked: (index: number) => void;
}
const MapNavigationLinks = ({ focused, clicked }: MapNavigationLinksProps) => {
  return navigationLinks.map(({ name, dataTest }, index) => {
    const style = focused === index ? "focused" : "";
    return (
      <li key={index} className={style} onClick={() => clicked(index)}>
        <Link to={"/"}>
          <a className="navLink" data-test={dataTest}>
            {name}
          </a>
        </Link>
      </li>
    );
  });
};

interface UseToggleProps {
  isActive: boolean;
  handleToggle: () => void;
}
const UseToggle = ({ handleToggle, isActive }: UseToggleProps) => {
  return (
    <button
      onClick={handleToggle}
      data-test="button-toggle"
      className={`navToggle ${isActive ? "active" : null}`}
    >
      <span />
      <span />
      <span />
    </button>
  );
};
