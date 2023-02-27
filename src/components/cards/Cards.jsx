import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Cards.css';

const LETTERS = 4;

class Cards extends Component {
  render() {
    const { albumImage, collectionName, artistName,
      trackCount, collectionPrice, releaseDate, collectionId } = this.props;
    return (
      <div>
        <div className="AlbumCard">
          <Link
            className="album-link"
            data-testid={ `link-to-album-${collectionId}` }
            to={ `/album/${collectionId}` }
          >
            <div className="image-container">
              <img src={ albumImage } alt={ collectionName } />
            </div>
            <div className="info-container">
              <p className="album-name">{ collectionName }</p>
              <p className="artist-name">
                { `${releaseDate.substring(0, LETTERS)} ● ${artistName}` }
              </p>
              <p className="none">{ trackCount }</p>
              <p className="none">{ collectionPrice }</p>
            </div>
          </Link>
        </div>

        {/*         <div className="album-details">
          <Link
            className="album-link"
            data-testid={ `link-to-album-${collectionId}` }
            to={ `/album/${collectionId}` }
          >
            Detalhes
          </Link>
          <div className="image-container">
            <img
              src={ album }
              alt="album do artista"
            />
          </div>

          { console.log(searchValue)} */}
        {/*  </div> */}
      </div>
    );
  }
}

Cards.propTypes = {
  searchValue: PropTypes.string,
}.isRequired;

export default Cards;
