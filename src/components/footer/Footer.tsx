import { FaInstagram, FaFacebook, FaMapMarkerAlt } from "react-icons/fa";
import "./footer.scss";

import logo from "../../assets/TodoDulceMary_sin_fondo.png";
import { MenuLinks } from "../../components/navigation/MenuLinks";
import { apiRootNavLink } from "../../api/apiRootNavLink";
import { useMenuState } from "../../hook/useMenuState";

export function Footer() {
  const { menuProductActive, toggleMenuProducts, closeMenu } = useMenuState();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-title">
          <img src={logo} className="footer-logo" alt="Company Logo" />
        </div>
        <div className="footer-column">
          <h4>Navegación</h4>
          <nav className="footer-nav">
            <MenuLinks
              routes={apiRootNavLink}
              menuProductActive={menuProductActive}
              toggleMenuProducts={toggleMenuProducts}
              closeMenu={closeMenu}
            />
          </nav>
        </div>

        <div className="footer-column">
          <h4>Redes Sociales</h4>
          <nav className="footer-icons">
            <ul>
              <li>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="instagram-icon" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="facebook-icon" />
                </a>
              </li>
              <li className="location">
                <div className="location-container">
                  <FaMapMarkerAlt className="location-icon" />
                  <span>Lanús Oeste</span>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="footer-copyright">
        <p>
          &copy; {new Date().getFullYear()} TodoDulceMary. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
