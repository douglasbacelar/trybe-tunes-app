import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from './Loading';

class Profile extends Component {
  state = {
    isLoading: false,
    user: { name: '', email: '', image: '', description: '' },
  };

  componentDidMount() {
    this.user();
  }

  user = async () => {
    const callUser = await getUser();
    console.log(callUser);
    this.setState({
      isLoading: true,
    }, async () => {
      this.setState({
        isLoading: false,
        user: callUser,
      });
    });
  };

  render() {
    const { isLoading, user } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-profile">
        <Header />
        <section>
          <img
            src={ user.image }
            alt={ user.image }
            data-testid="profile-image"
          />
          <h2>{ user.name }</h2>
          <h2>{ user.email }</h2>
          <p>{ user.description }</p>
          <Link to="/profile/edit">Editar perfil</Link>
        </section>
      </div>
    );
  }
}

export default Profile;
