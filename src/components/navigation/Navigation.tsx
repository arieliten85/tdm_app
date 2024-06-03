// import React, { useState } from "react";
// import "./navigation.scss";
// import { FaSearch } from "react-icons/fa";

// export const Navigation: React.FC = () => {
//   const [menuActive, setMenuActive] = useState(false);

//   const toggleMenu = () => {
//     setMenuActive(!menuActive);
//   };

//   return (
//     <header className="header" id="header">
//       <nav className="navbar container">
//         <div className="container-brand">
//           <span className="brand">TodoDulceMary</span>
//         </div>
//         <div className={`menu ${menuActive ? "is-active" : ""}`} id="menu">
//           <ul className="menu-inner">
//             <li className="menu-item">
//               <a href="#" className="menu-link">
//                 inicio
//               </a>
//             </li>
//             <li className="menu-item">
//               <a href="#" className="menu-link">
//                 Productos
//               </a>
//             </li>
//             <li className="menu-item">
//               <a href="#" className="menu-link">
//                 como comprar
//               </a>
//             </li>
//             <li className="menu-item">
//               <a href="#" className="menu-link">
//                 nosotros
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div className="search">
//           <form className="search-form">
//             <input
//               type="text"
//               name="search"
//               className="search-input"
//               placeholder="Búscar"
//               autoFocus
//             />
//             <button type="submit" className="search-submit" disabled>
//               <FaSearch />
//             </button>
//           </form>
//         </div>

//         <div
//           className={`burger ${menuActive ? "is-active" : ""}`}
//           id="burger"
//           onClick={toggleMenu}
//         >
//           <span className="burger-line"></span>
//           <span className="burger-line"></span>
//           <span className="burger-line"></span>
//         </div>
//       </nav>
//     </header>
//   );
// };

/////////// search oculto
import React, { useState, useEffect } from "react";
import "./navigation.scss";
import { FaSearch } from "react-icons/fa";

export const Navigation: React.FC = () => {
  const [menuActive, setMenuActive] = useState(false);

  const [searchVisible, setSearchVisible] = useState(true);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
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
              <a href="#" className="menu-link">
                inicio
              </a>
            </li>
            <li className="menu-item">
              <a href="#" className="menu-link">
                Productos
              </a>
            </li>
            <li className="menu-item">
              <a href="#" className="menu-link">
                como comprar
              </a>
            </li>
            <li className="menu-item">
              <a href="#" className="menu-link">
                nosotros
              </a>
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
