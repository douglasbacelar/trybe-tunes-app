import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs, removeSong, addSong } from '../../services/favoriteSongsAPI';
import Header from '../../components/header/Header';
import getMusics from '../../services/musicsAPI';
import MusicCard from '../../components/musicCard/MusicCard';
import Loading from '../loading/Loading';
import './Album.css';

const YEAR = 4;

class Album extends Component {
  state = {
    favoriteSongs: [],
    musics: [],
    isLoading: false,
    artistName: '',
    artistCollection: '',
    releaseDate: '',
  };

  componentDidMount() {
    const { match: { params } } = this.props;
    this.setState({
      isLoading: true,
    }, async () => {
      const callAlbum = await getMusics(params.id);
      const favMusics = await getFavoriteSongs();
      this.setState({
        isLoading: false,
        musics: callAlbum,
        favoriteSongs: [...favMusics],
        artistName: callAlbum[0].artistName,
        artistCollection: callAlbum[0].collectionName,
        album: callAlbum[0].artworkUrl100,
        releaseDate: callAlbum[0].releaseDate,
      });
      /*       console.log(callAlbum) */
    });
  }

  handleChange = (music) => {
    const { favoriteSongs } = this.state;
    this.setState({ isLoading: true }, async () => {
      if (favoriteSongs.some((song) => song.trackId === music.trackId)) {
        await removeSong(music);
      } else {
        await addSong(music);
      }
      const favMusics = await getFavoriteSongs();
      this.setState({
        isLoading: false,
        favoriteSongs: [...favMusics],
      });
    });
  };

  render() {
    const { isLoading, musics,
      favoriteSongs, artistName,
      artistCollection, album, releaseDate } = this.state;
    const albumJustMusics = musics.slice(1, musics.length);
    return (
      <div data-testid="page-album">
        <header>
          <Header />
          {
            isLoading
              ? <Loading />
              : (
                <>
                  <div className="album-info">
                    <div className="album-image-container">
                      <img
                        className="album-image"
                        src={ album }
                        alt={ artistCollection }
                      />
                    </div>
                    <div>
                      <h1 className="album-name" data-testid="album-name">
                        { artistCollection }
                      </h1>
                      <p className="artist-name" data-testid="artist-name">
                        {`${releaseDate.substring(0, YEAR)} ● ${artistName}` }
                      </p>
                    </div>
                  </div>
                  <div className="music-card-container">
                    {albumJustMusics.map((music, index) => (
                      <MusicCard
                        key={ index }
                        music={ music }
                        handleChange={ this.handleChange }
                        favoriteSongs={ favoriteSongs }
                        trackId={ music.trackId }
                        trackName={ music.trackName }
                        trackNumber={ music.trackNumber }
                        artistName={ music.artistName }
                        previewUrl={ music.previewUrl }
                      />
                    ))}

                  </div>
                </>
              )
          }
        </header>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default Album;
