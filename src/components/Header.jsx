import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    username: '',
    isLoading: true,
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
      <div>
        <header data-testid="header-component">
          { isLoading
            ? <Loading />
            : <p data-testid="header-user-name">{ `Bem vindo ${username.name}` }</p>}
        </header>
        <nav>
          <ul>
            <li><Link to="/search" data-testid="link-to-search">Search</Link></li>
            <li>
              <Link to="/favorites" data-testid="link-to-favorites">
                Favorite Songs
              </Link>
            </li>
            <li><Link to="/profile" data-testid="link-to-profile">Profile</Link></li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Header;
