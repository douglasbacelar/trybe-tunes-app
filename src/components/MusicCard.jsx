import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  state = {
    isLoading: false,
    favoriteList: [],
  };

  componentDidMount() {
    this.bestMusics();
  }

  bestMusics = async () => {
    const favoriteMusics = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favoriteList: [...favoriteMusics],
    });
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, this.favoriteSong);
  };

  favoriteSong = async () => {
    const { album } = this.props;
    const { favoriteList } = this.state;
    this.setState({
      isLoading: true,
    }, async () => {
      if (favoriteList.some((song) => song.trackId === album.trackId)) {
        await removeSong(album);
      } else {
        await addSong(album);
      }
      // getFavoriteList();
      const favSongs = await getFavoriteSongs();
      this.setState({
        isLoading: false,
        favoriteList: [...favSongs],
      });
    });
  };

  render() {
    const { previewUrl, trackId, trackName, album } = this.props;
    const { isLoading, favoriteList } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div>
        <ul>
          <li>
            {trackName}
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
            <label
              htmlFor="favoriteMusic"
            >
              Favorita
              <input
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                id="favoriteMusic"
                name="checked"
                checked={ favoriteList.some((song) => song.trackId === album.trackId) }
                onChange={ this.handleChange }
              />
            </label>
          </li>
        </ul>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackId: PropTypes.string,
  trackName: PropTypes.string,
}.isRequired;

export default MusicCard;
