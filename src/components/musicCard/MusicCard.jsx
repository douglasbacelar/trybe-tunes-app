import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import './MusicCard.css';

class MusicCard extends Component {
  playOrPauseMusic = async ({ target }) => {
    const { id } = target;
    const audio = document.getElementById(`audio-${id}`);
    const audioParent = audio.parentElement;
    const removeParentClass = 'playing-parent';
    if (audio.classList.contains('playing')) {
      audio.classList.remove('playing');
      audioParent.classList.remove(removeParentClass);
      await audio.pause();
    } else {
      const oldAudio = document.getElementsByClassName('playing')[0];
      if (oldAudio !== undefined) {
        const oldAudioParent = oldAudio.parentElement;
        oldAudio.classList.remove('playing');
        oldAudioParent.classList.remove(removeParentClass);
        await oldAudio.pause();
      }
      audio.classList.add('playing');
      audioParent.classList.add(removeParentClass);
      await audio.play();
    }
  };

  render() {
    const { music, handleChange, favoriteSongs,
      trackId, trackName, trackNumber,
      artistName, previewUrl } = this.props;
    return (
      <div>

        <div className="MusicCard">
          <audio
            type="audio/mpeg"
            id={ `audio-${trackNumber}` }
            data-testid="audio-component"
            src={ previewUrl }
          >
            <track kind="captions" />
          </audio>

          <div className="track-id-container">
            <p className="track-id">▶</p>
            <button
              className="play-button-album"
              id={ trackNumber }
              type="button"
              onClick={ this.playOrPauseMusic }
            >
              ▶
            </button>
          </div>

          <div className="track-name-container">
            <p className="track-name">{ trackName }</p>
            <p className="track-artist-name">{ artistName }</p>
          </div>

          <div className="heart-container">

            <input
              className="check-heart"
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              name="favorite"
              id={ trackId }
              onChange={ () => handleChange(music) }
              checked={ favoriteSongs.some((song) => song.trackId === music.trackId) }
            />
            { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
            <label className="heart-label" htmlFor={ trackId }>
              <FontAwesomeIcon icon={ faHeart } />
            </label>
          </div>
        </div>

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
