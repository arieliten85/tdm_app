import './navigation.scss';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MenuLinks } from './MenuLinks';
import { SearchBar } from '../../components/search/SearchBar';
import { useMenuState } from '../../hook/useMenuState';
import { useSearch } from '../../hook/useSearch';
import { useScrollVisibility } from '../../hook/useScrollVisibility';
import { apiRootNavLink } from '../../api/apiRootNavLink';

import { useGetParamsLocation } from '../../hook/useGetParamsLocation';

export const Navigation = () => {
  const { menuActive, menuProductActive, toggleMenu, toggleMenuProducts, closeMenu } =
    useMenuState();
  const { location } = useGetParamsLocation();
  const { searchValue, setSearchValue, handleSearch, handleKeyDown } = useSearch();

  const isSearchVisible = useScrollVisibility();

  // BORRA EL VALOR DEL INPUT AL CAMBIAR DE RUTA
  useEffect(() => {
    setSearchValue('');
  }, [location, setSearchValue]);

  return (
    <header className="header" id="header top">
      <nav className="navbar container">
        <div className="container-brand">
          <Link to={'/'}>
            <h1 className="brand">TodoDulceMary</h1>
            <p>Pasteleria</p>
          </Link>
          <div
            style={{
              width: '20px',
              height: '32px',
              background: 'rgb(255, 255, 255)',
              position: 'absolute',
              bottom: '12px',
              left: '-7px',
            }}
          ></div>
          <div
            style={{
              width: '20px',
              height: '32px',
              background: 'rgb(255, 255, 255)',
              position: 'absolute',
              bottom: '12px',
              right: '-7px',
            }}
          ></div>
        </div>
        <div className={`menu ${menuActive ? 'is-active' : ''}`} id="menu">
          <MenuLinks
            routes={apiRootNavLink}
            menuProductActive={menuProductActive}
            toggleMenuProducts={toggleMenuProducts}
            closeMenu={closeMenu}
          />
        </div>

        <SearchBar
          isVisible={isSearchVisible}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleSearch={handleSearch}
          handleKeyDown={handleKeyDown}
        />

        <div className={`burger ${menuActive ? 'is-active' : ''}`} id="burger" onClick={toggleMenu}>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </div>
      </nav>
    </header>
  );
};
