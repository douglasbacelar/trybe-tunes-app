import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  state = {
    isLoading: false,
    checked: false,
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
    // const { favoriteList } = this.state;
    // console.log(favoriteList);
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, this.favoriteSong);
  };

  favoriteSong = async () => {
    const { album } = this.props;
    const { favoriteList } = this.state;
    console.log(favoriteList);
    this.setState({
      isLoading: true,
    }, async () => {
      if (favoriteList.some((song) => song.trackId === album.trackId)) {
        await removeSong(album);
      } else {
        await addSong(album);
      }
      this.setState({
        isLoading: false,
        checked: true,
      });
    });
  };

  render() {
    const { previewUrl, trackId, trackName } = this.props;
    const { isLoading, checked } = this.state;
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
                checked={ checked }
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
