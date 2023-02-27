import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import { getUser } from '../../services/userAPI';
import './Header.css';
/* import fotoPerfil from './fotoPerfil.png'; */

class Header extends Component {
  state = {
    username: '',
    isLoading: true,
  };

  toggleMenu = () => {
    const menuMobile = document.getElementById('menu-mobile');
    if (menuMobile.className === 'menu-mobile-active') {
      menuMobile.className = 'menu-mobile';
    } else {
      menuMobile.className = 'menu-mobile-active';
    }
  };

  render() {
    const { username, isLoading } = this.state;
    const headerShow = async () => {
      const callGetUser = await getUser();
      this.setState({
        username: callGetUser,
        isLoading: false,
      });
    };
    headerShow();
    return (
      <body>
        <header className="sidebar" data-testid="header-component">
          <div className="logo-container">
            <FontAwesomeIcon className="icon-logo" icon={ faCompactDisc } />
            <p className="text-logo">Trybetunes</p>
          </div>

          <div className="line" />

          <button data-testid="link-to-search">
            <i className="material-symbols-outlined">Search</i>
            <NavLink
              to="/search"
              className="menu-link"
            >
              Procurar
            </NavLink>
          </button>

          <button data-testid="link-to-favorites">
            <i className="material-symbols-outlined">Favorite</i>
            <NavLink
              to="/favorites"
              className="menu-link"
            >
              Curtidas
            </NavLink>
          </button>

          <button data-testid="link-to-profile">
            <i className="material-symbols-outlined">Person</i>
            <NavLink
              to="/profile"
              className="menu-link"
            >
              Perfil
            </NavLink>
          </button>

          <div className="line" />
          <div className="line-bottom" />

          <div className="user-container" data-testid="header-component">
            { isLoading
              ? '...'
              : (
                <div>
                  {/*                     <img className="logo-img" src={ fotoPerfil } alt="Foto de perfil" /> */}
                  <p data-testid="header-user-name" className="user-name">
                    { username.name }
                  </p>
                </div>
              )}
          </div>

        </header>
        <button
          className="button-mobile"
          onClick={ this.toggleMenu }
        >
          <i className="material-symbols-outlined">menu</i>
          <span>Menu</span>
        </button>

        <nav className="menu-mobile" id="menu-mobile">

          <button className="button-close" onClick={ this.toggleMenu }>
            <span>
              <i className="material-symbols-outlined">close</i>
            </span>
          </button>

          <button data-testid="link-to-search">
            <i className="material-symbols-outlined">Search</i>
            <span>
              <Link to="/search" className="mobile-text">Search</Link>
            </span>
          </button>

          <button data-testid="link-to-favorites">
            <i className="material-symbols-outlined">Favorite</i>
            <span>
              <Link to="/favorites" className="mobile-text">
                Favorite Songs
              </Link>
            </span>
          </button>

          <button data-testid="link-to-profile">
            <i className="material-symbols-outlined">Person</i>
            <span>
              <Link to="/profile" className="mobile-text">Profile</Link>
            </span>
          </button>
        </nav>

      </body>

    );
  }
}

export default Header;
