import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    isLoading: false,
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { name, email, description, image } = this.state;
    this.setState({
      isLoading: true,
    });
    await createUser({ name, email, description, image });
    const { history } = this.props;
    this.setState({
      isLoading: false,
    }, () => history.push('/search'));
  };

  render() {
    const { name, isLoading, email, description, image } = this.state;
    const minLength = 3;
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name">
            Name:
            <input
              data-testid="login-name-input"
              type="text"
              id="name"
              value={ name }
              name="name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="text"
              id="email"
              value={ email }
              name="email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Description
            <input
              type="text"
              id="description"
              value={ description }
              name="description"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="image">
            Image
            <input
              type="text"
              id="image"
              value={ image }
              name="image"
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ name.length < minLength }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
