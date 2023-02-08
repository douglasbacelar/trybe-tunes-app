import React, { Component } from 'react';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
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
      <div data-testid="page-favorites">
        Favorites
        <Header />
        {
          isLoading ? <Loading /> : (
            favorites.map((music, index) => (
              <MusicCard
                key={ index }
                music={ music }
                handleChange={ this.handleChange }
                favoriteSongs={ favorites }
              />
            ))
          )
        }
      </div>
    );
  }
}

export default Favorites;
