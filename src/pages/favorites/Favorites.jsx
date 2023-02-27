import React, { Component } from 'react';
import { getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import Header from '../../components/header/Header';
import MusicCard from '../../components/musicCard/MusicCard';
import './Favorites.css';
import '../../components/musicCard/MusicCard.css';

class Favorites extends Component {
  state = {
    isLoading: false,
    favorites: [],
  };

  componentDidMount() {
    this.favoriteListMusics();
  }

  favoriteListMusics = async () => {
    this.setState({
      isLoading: true,
    }, async () => {
      const selectedFavSongs = await getFavoriteSongs();
      this.setState({
        isLoading: false,
        favorites: [...selectedFavSongs],
      });
    });
  };

  handleChange = (music) => {
    this.setState({ isLoading: true }, async () => {
      await removeSong(music);
      const selectedFavSongs = await getFavoriteSongs();
      this.setState({
        isLoading: false,
        favorites: [...selectedFavSongs],
      });
    });
  };

  render() {
    const { isLoading, favorites } = this.state;
    return (
      <div className="desktop">
        <Header />

        <div className="AlbumId Favorites" data-testid="page-favorites">
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
          <div className="album-info">
            <div className="album-image-container">
              <img
                className="album-image"
                src="https://i.pinimg.com/originals/b5/6b/e4/b56be4c73ac7edfdb53f78db9c7a0708.jpg"
                alt="favorite-musics"
              />
            </div>
            <div>
              <h1 className="album-name" data-testid="album-name">
                Músicas Curtidas
              </h1>
              <p className="artist-name" data-testid="artist-name">
                Playlist
              </p>
            </div>
          </div>
          {
            favorites.map((music, index) => (
              <MusicCard
                key={ index }
                music={ music }
                handleChange={ this.handleChange }
                favoriteSongs={ favorites }
                trackId={ music.trackId }
                trackName={ music.trackName }
                trackNumber={ music.trackNumber }
                artistName={ music.artistName }
                previewUrl={ music.previewUrl }
              />
            ))
          }
        </div>
      </div>
    );
  }
}

export default Favorites;
