import React, { useEffect, useState } from 'react';
import './Header.css';
import logo from '../../images/logo.png';
import searchIcon from '../../images/searchIcon.png';
import homeIcon from '../../images/homeIcon.png';
import msgIcon from '../../images/msgIcon.png';
import bellIcon from '../../images/bellIcon.png';
import avatar from '../../images/avatar.png';

const Header = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect (() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const showText = windowWidth >= 800;

  return (
    <section className="header">
      <div className="header__wrraper">
        <div className="logo__wrapper">
            <img className="logo" src={logo} alt="Tedooo logo"/>
            <div className="search__wrapper">
              <img className="search-img" src={searchIcon} alt="Search Icon"/>
              { showText && <p className="header__text">Search</p> }
            </div>
        </div>

        <div className="navbar">
          <div className="navbar__wrapper navbar__wrraper-home">
            <img className="navbar__img" alt="Home Icon" src={homeIcon}/>
            { showText && <p className="active__text">Home</p> }
          </div>

          <div className="navbar__wrapper">
            <img className="navbar__img" alt="Message Icon" src={msgIcon}/>
            { showText && <p className="navbar__text">Messaging</p> }
          </div>

          <div className="navbar__wrapper">
            <img className="navbar__img" alt="Bell Icon" src={bellIcon}/>
            { showText && <p className="navbar__text">Notifications</p> }
          </div>

          <img className="avatar" src={avatar} alt="Avatar"/>
        </div>
      </div>
    </section>
  );
}

export default Header;