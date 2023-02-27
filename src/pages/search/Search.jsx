import React, { Component } from 'react';
import Header from '../../components/header/Header';
import Loading from '../loading/Loading';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import Cards from '../../components/cards/Cards';
import './Search.css';

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
      <div>
        <header>
          <Header />
        </header>
        <body data-testid="page-search" className="body-search">

          <form className="artist-search">

            <label htmlFor="name" className="text-field">
              <input
                className="input-artist"
                data-testid="search-artist-input"
                type="text"
                placeholder="Artista ou banda..."
                id="artist"
                name="artist"
                value={ artist }
                onChange={ this.handleChange }
              />
            </label>

            <button
              data-testid="search-artist-button"
              type="button"
              className="button-search"
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
                  <p className="found">
                    {' '}
                    { `Resultado de álbuns de: ${searchValue}`}
                  </p>
                  <div className="album-container">
                    { albuns.map((album) => (
                      <Cards
                        key={ album.collectionId }
                        albumImage={ album.artworkUrl100 }
                        artistName={ album.artistName }
                        collectionId={ album.collectionId }
                        collectionName={ album.collectionName }
                        collectionPrice={ album.collectionPrice }
                        trackCount={ album.trackCount }
                        releaseDate={ album.releaseDate }
                      />
                    ))}
                  </div>
                </div>)
              : <p className="album-not-found">Nenhum álbum foi encontrado</p>
          }
        </body>
      </div>
    );
  }
}

export default Search;
