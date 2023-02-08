import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { music, handleChange, favoriteSongs } = this.props;
    return (
      <div>
        <ul>
          <li>
            {music.trackName}
            <audio data-testid="audio-component" src={ music.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
            <label
              htmlFor={ music.trackId }
            >
              Favorita
              <input
                data-testid={ `checkbox-music-${music.trackId}` }
                type="checkbox"
                id={ music.trackId }
                name={ music.trackId }
                checked={ favoriteSongs.some((song) => song.trackId === music.trackId) }
                onChange={ () => handleChange(music) }
              />
            </label>
          </li>
        </ul>
      </div>
    );
  }
}

MusicCard.propTypes = {
  handleChange: PropTypes.func,
  music: PropTypes.array,
  favoriteSongs: PropTypes.array,
}.isRequired;

export default MusicCard;
