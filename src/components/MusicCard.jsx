import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  state = {
    isLoading: false,
    checked: false,
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    console.log(target.value);

    this.setState({
      [name]: value,
    }, this.favoriteSong);
  };

  favoriteSong = async () => {
    this.setState({
      isLoading: true,
    }, async () => {
      await addSong();
      this.setState({
        isLoading: false,
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
