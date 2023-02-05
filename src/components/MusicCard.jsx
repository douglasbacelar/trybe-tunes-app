import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  state = {
    isLoading: false,
    checkbox: false,
    music: '',
    // favoriteList: [],
  };

  async componentDidMount() {
    this.favoriteSong();
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  favoriteSong = async (e) => {
    this.setState({
      isLoading: true,
    }, async () => {
      const evento = e.target.value;
      console.log(evento);
      // const selectMusic = await addSong();
      this.setState({
        isLoading: false,
        // favoriteList: e.target.value,
      });
    });
  };

  render() {
    const { albumList } = this.props;
    const { isLoading, checkbox, music } = this.state;
    const removeInfoAlbum = albumList.slice(1, albumList.length);
    if (isLoading) return <Loading />;
    return (
      <div>
        <ul>
          {removeInfoAlbum.map((album, index) => (

            <li
              key={ index }
              value={ music }
              name="music"
              onChange={ this.handleChange }
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

              <label htmlFor="favoriteMusic">
                Favorita
                <input
                  data-testid={ `checkbox-music-${album.trackId}` }
                  type="checkbox"
                  id="favoriteMusic"
                  name="checkbox"
                  value={ checkbox }
                  // onClick={ this.favoriteSong }
                  onChange={ this.handleChange }
                />
              </label>
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
