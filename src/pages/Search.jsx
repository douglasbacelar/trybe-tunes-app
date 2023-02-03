import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    artist: '',
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { artist } = this.state;
    const minLength = 2;
    return (
      <div data-testid="page-search">
        Search
        <Header />
        <form>
          <label htmlFor="name">
            Artist:
            <input
              data-testid="search-artist-input"
              type="text"
              id="artist"
              name="artist"
              value={ artist }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ artist.length < minLength }
            onClick={ this.handleClick }
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
