import React, { Component } from 'react';
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
      console.log(callGetUser);
    };
    headerShow();
    return (
      <div>
        <header data-testid="header-component">
          { isLoading
            ? <Loading /> : <p data-testid="header-user-name">{ username.name }</p>}
        </header>
      </div>
    );
  }
}

export default Header;
