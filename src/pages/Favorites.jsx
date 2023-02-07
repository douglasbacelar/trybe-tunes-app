import React, { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';

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

  render() {
    const { isLoading, favorites } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-favorites">
        Favorites
        <Header />
        {favorites.map((album, index) => (
          <MusicCard
            key={ index }
            previewUrl={ album.previewUrl }
            trackId={ album.trackId }
            trackName={ album.trackName }
            album={ album }
            getFavoriteList={ this.favoriteListMusics }
          />
        ))}
      </div>
    );
  }
}

export default Favorites;
