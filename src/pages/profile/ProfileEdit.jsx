import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../../services/userAPI';
import Header from '../../components/header/Header';
import './ProfileEdit.css';

class ProfileEdit extends Component {
  state = {
    isLoading: false,
    erroInfo: {
      nameError: 'erro',
      emailError: 'erro',
      descriptionError: 'erro',
      imageError: 'erro',
    },
    user: {},
    isDisabled: true,
  };

  componentDidMount() {
    this.callErrors();
  }

  callErrors = () => {
    this.setState({
      isLoading: true }, async () => {
      const user = await getUser();
      this.setState({
        user,
        isLoading: false,
        erroInfo: {
          nameError: user.name ? '' : 'erro',
          emailError: user.email ? '' : 'erro',
          descriptionError: user.description ? '' : 'erro',
          imageError: user.image ? '' : 'erro',
        },
      }, this.verifyErro);
    });
  };

  verifyErro = () => {
    const { erroInfo } = this.state;
    if (Object.values(erroInfo).every((error) => error === '')) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  infoValidation = (name, input, messageError) => {
    if (!input) {
      this.setState((prevState) => ({
        erroInfo: {
          ...prevState.erroInfo,
          [name]: messageError,
        },
      }), this.verifyErro);
    } else {
      this.setState((prevState) => ({
        erroInfo: {
          ...prevState.erroInfo,
          [name]: '',
        },
      }), this.verifyErro);
    }
  };

  checkValidationAll = (name) => {
    const { user } = this.state;
    if (name === 'name') {
      const nameError = 'Favor preencher nome';
      this.infoValidation('nameError', user.name, nameError);
    }

    if (name === 'email') {
      const emailError = 'Favor preencher email';
      this.infoValidation('emailError', user.email, emailError);
    }

    if (name === 'description') {
      const descriptionError = 'Favor preencher descrição';
      this.infoValidation('descriptionError', user.description, descriptionError);
    }

    if (name === 'image') {
      const imageError = 'Favor preencher imagem';
      this.infoValidation('imageError', user.image, imageError);
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [name]: value,
      },
    }), () => this.checkValidationAll(name));
  };

  handleClick = () => {
    const { history } = this.props;
    const { user } = this.state;
    this.setState({ isLoading: true }, async () => {
      await updateUser(user);
      history.push('/profile');
    });
  };

  render() {
    const { isLoading, isDisabled, user } = this.state;
    return (
      <div className="desktop">
        <Header />
        <div className="ProfileEdit" data-testid="page-profile-edit">
          <h1>Editar Perfil</h1>
          {
            isLoading
              ? (
                <div className="edit-loading">
                  <div className="lds-ring">
                    <div />
                    <div />
                    <div />
                    <div />
                  </div>
                </div>
              )
              : null
          }
          <form>
            <label className="edit-container" htmlFor="name">
              Nome:
              <input
                className="edit-input"
                autoComplete="off"
                type="text"
                name="name"
                id="name"
                value={ user.name }
                onChange={ this.handleChange }
                data-testid="edit-input-name"
              />
            </label>

            <label className="edit-container" htmlFor="email">
              Email:
              <input
                className="edit-input"
                autoComplete="off"
                type="email"
                name="email"
                id="email"
                value={ user.email }
                onChange={ this.handleChange }
                data-testid="edit-input-email"
              />
            </label>

            <label className="edit-container" htmlFor="profile-image">
              Imagem
              {/*   <img src={ user.image } alt={ user.name } /> */}
              <input
                className="edit-input"
                autoComplete="off"
                type="text"
                name="image"
                id="profile-image"
                value={ user.image }
                onChange={ this.handleChange }
                data-testid="edit-input-image"
              />
            </label>

            <label className="edit-container" htmlFor="description">
              Descrição:
              <input
                className="edit-input"
                autoComplete="off"
                type="text"
                name="description"
                id="description"
                value={ user.description }
                onChange={ this.handleChange }
                data-testid="edit-input-description"
              />
            </label>

            <button
              className="save-edit-button"
              type="button"
              onClick={ this.handleClick }
              data-testid="edit-button-save"
              disabled={ isDisabled }
            >
              Salvar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.object,
}.isRequired;
export default ProfileEdit;
