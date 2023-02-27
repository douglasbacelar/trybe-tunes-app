import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import { getUser } from '../../services/userAPI';
import Header from '../../components/header/Header';
import './Profile.css';

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
      <div className="desktop">
        <Header />
        <div className="Profile" data-testid="page-profile">
          {
            isLoading ? <FontAwesomeIcon
              className="loading-profile-icon"
              icon={ faCompactDisc }
            /> : (
              <div className="profile-container">
                <div className="image-info-container">
                  <div className="profile-image-container">
                    <img
                      data-testid="profile-image"
                      src={
                        (image.length === 0)
                          ? 'https://job.masterkorean.vn/theme/oklassedu/pix/avtdef.jpg'
                          : image
                      }
                      alt={ name }
                    />
                  </div>
                  <div className="profile-info-container">
                    <p className="profile-name">{ name }</p>
                    <p className="profile-email">{ email }</p>
                  </div>
                </div>
                <p className="profile-description">{ description }</p>
                <Link className="profile-edit-button" to="/profile/edit">
                  Editar perfil
                </Link>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default Profile;
