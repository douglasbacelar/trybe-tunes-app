import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs, removeSong, addSong } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';

class Album extends Component {
  state = {
    favoriteSongs: [],
    musics: [],
    isLoading: false,
    artistName: '',
    artistCollection: '',
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
      });
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
    const { isLoading, musics, favoriteSongs, artistName, artistCollection } = this.state;
    console.log(artistCollection);
    console.log(musics);
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
                  <h2 data-testid="artist-name">{artistName}</h2>
                  <h2 data-testid="album-name">{artistCollection}</h2>
                  {albumJustMusics.map((music, index) => (
                    <MusicCard
                      key={ index }
                      music={ music }
                      handleChange={ this.handleChange }
                      favoriteSongs={ favoriteSongs }
                    />
                  ))}
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
