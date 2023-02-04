import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Cards extends Component {
  render() {
    const { searchValue, collectionId } = this.props;
    return (
      <div>
        { searchValue }
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          Detalhes
        </Link>
      </div>
    );
  }
}

Cards.propTypes = {
  searchValue: PropTypes.string,
}.isRequired;

export default Cards;
