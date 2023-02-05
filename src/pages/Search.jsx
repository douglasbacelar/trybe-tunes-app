import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Cards from '../components/Cards';

class Search extends Component {
  state = {
    artist: '',
    albuns: [],
    isLoading: false,
    searchValue: '',
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  handleClickErase = async () => {
    const { artist } = this.state;
    this.setState({
      isLoading: true,
      searchValue: artist,
    }, async () => {
      const searchId = await searchAlbumsAPI(artist);
      this.setState({
        albuns: searchId,
        isLoading: false,
        artist: '',
      });
    });
  };

  render() {
    const { artist, albuns, isLoading, searchValue } = this.state;
    const minLength = 2;
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-search">

        <header>
          Search
          <Header />
        </header>

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
            onClick={ this.handleClickErase }
          >
            Search
          </button>

        </form>

        {
          (albuns.length) !== 0
            ? (
              <div>
                <p>
                  {' '}
                  { `Resultado de álbuns de: ${searchValue}`}
                </p>
                { albuns.map((album) => (
                  <Cards
                    key={ album.collectionId }
                    artistId={ album.artistId }
                    searchValue={ album.collectionName }
                    collectionId={ album.collectionId }
                  />
                ))}
              </div>)
            : <p>Nenhum álbum foi encontrado</p>
        }
      </div>
    );
  }
}

export default Search;
