import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    albumList: [],
    artistName: '',
    albumName: '',
  };

  async componentDidMount() {
    this.searchAlbum();
  }

  searchAlbum = async () => {
    const { match: { params } } = this.props;
    const callAlbum = await getMusics(params.id);
    this.setState({
      artistName: callAlbum[0].artistName,
      albumName: callAlbum[0].collectionName,
      albumList: callAlbum,
    });
  };

  render() {
    const { artistName, albumName, albumList } = this.state;
    const albumJustMusics = albumList.slice(1, albumList.length);
    console.log(albumJustMusics);
    return (
      <div data-testid="page-album">
        <header>
          <Header />
          <p data-testid="artist-name">{artistName}</p>
          <p data-testid="album-name">{albumName}</p>
        </header>
        <section>
          { albumJustMusics.map((album, index) => (
            <MusicCard
              key={ index }
              previewUrl={ album.previewUrl }
              trackId={ album.trackId }
              trackName={ album.trackName }
              album={ album }
            />
          ))}

        </section>
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
