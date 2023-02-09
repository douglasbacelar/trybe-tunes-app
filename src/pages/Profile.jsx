import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from './Loading';

class Profile extends Component {
  state = {
    isLoading: false,
    name: '',
    email: '',
    image: '',
    description: '',
  };

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });

    const { name, email, image, description } = await getUser();
    this.setState({
      name,
      email,
      image,
      description,
      isLoading: false,
    });
  }

  render() {
    const { isLoading, name, email, image, description } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          isLoading ? <Loading /> : (
            <>
              <h2>Nome</h2>
              <p>{name}</p>
              <h2>Email</h2>
              <p>{email}</p>
              <h2>Imagem</h2>
              <img
                data-testid="profile-image"
                src={ image }
                alt="Imagem do usuário"
              />
              <h2>Descrição</h2>
              <p>{description}</p>
              <Link to="/profile/edit">Editar perfil</Link>
            </>
          )
        }
      </div>
    );
  }
}

export default Profile;
