import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../../services/userAPI';
import Loading from '../loading/Loading';
import './Login.css';
import musicPerson from './headphone.gif';

class Login extends Component {
  state = {
    name: '',
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
    const { name } = this.state;
    this.setState({
      isLoading: true,
    });
    await createUser({ name });
    const { history } = this.props;
    this.setState({
      isLoading: false,
    }, () => history.push('/search'));
  };

  render() {
    const { name, isLoading } = this.state;
    const minLength = 3;
    if (isLoading) return <Loading />;
    return (
      <main className="main-login">
        <div className="left-login">
          <h1>
            Faça seu login
            <br />
            e aproveite as melhores músicas
          </h1>
          <img
            src={ musicPerson }
            className="left-login-image"
            alt="pessoa escutando musica"
          />
        </div>
        <div data-testid="page-login" className="right-login">
          <form className="card-login">
            <h1>Login</h1>

            <label htmlFor="name" className="text-field">
              <input
                data-testid="login-name-input"
                type="text"
                placeholder="Usuário"
                id="name"
                value={ name }
                name="name"
                onChange={ this.handleChange }
              />
            </label>

            <button
              className="btn-login"
              data-testid="login-submit-button"
              type="button"
              disabled={ name.length < minLength }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </form>
        </div>
      </main>

    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
