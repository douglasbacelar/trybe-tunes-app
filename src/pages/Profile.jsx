import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from './Loading';

class Profile extends Component {
  state = {
    isLoading: false,
    userName: '',
  };

  async componentDidMount() {
    const userName = await getUser();
    this.setState({ isLoading: true }, async () => {
      this.setState({
        userName,
        isLoading: false,
      });
    });
  }

  render() {
    const { isLoading, userName } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {isLoading ? <Loading /> : (
          <>
            <img
              src={ userName.image }
              alt={ userName.name }
              data-testid="profile-image"
            />
            <h2>Nome</h2>
            <p>{userName.name}</p>
            <h2>Email</h2>
            <p>{userName.email}</p>
            <h2>Descrição</h2>
            <p>{userName.description}</p>
            <Link to="/profile/edit">Editar perfil</Link>
          </>
        )}
      </div>
    );
  }
}

export default Profile;
