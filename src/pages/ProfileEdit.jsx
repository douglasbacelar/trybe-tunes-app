import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from './Loading';

class ProfileEdit extends Component {
  state = {
    isLoading: false,
  };

  componentDidMount() {
    this.user();
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  user = async () => {
    const callUser = await getUser();
    this.setState({
      isLoading: true,
    }, async () => {
      console.log(callUser.image);
      this.setState({
        isLoading: false,
      });
    });
  };

  render() {
    const { isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-profile-edit">
        ProfileEdit
        <Header />
        <section>
          <form>
            <input
              data-testid="edit-input-name"
              type="text"
              // value={ inputName }
              name="inputName"
              onChange={ this.handleChange }
            />
            <input
              data-testid="edit-input-email"
              type="email"
              // value={ inputEmail }
              name="inputEmail"
              onChange={ this.handleChange }
            />
            <textarea
              data-testid="edit-input-description"
              // value={ inputDescription }
              name="inputDescription"
              onChange={ this.handleChange }
            />
            <input
              data-testid="edit-input-image"
              type="text"
              // value={ inputImage }
              name="inputImage"
              onChange={ this.handleChange }
            />
            <button
              type="button"
              data-testid="edit-button-save"
              // disabled={ buttonDisabled }
              // onClick={ onClickFunc }
            >
              Salvar

            </button>
          </form>
        </section>
      </div>
    );
  }
}

export default ProfileEdit;
