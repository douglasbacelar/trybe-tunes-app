import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { albumList } = this.props;
    const removeInfoAlbum = albumList.slice(1, albumList.length);
    return (
      <div>
        <ul>
          {removeInfoAlbum.map((album, index) => (
            <li
              key={ index }
            >
              {album.trackName}
              <audio data-testid="audio-component" src={ album.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

MusicCard.propTypes = {
  albumList: PropTypes.array,
}.isRequired;

export default MusicCard;
