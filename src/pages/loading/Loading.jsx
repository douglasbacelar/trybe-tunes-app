import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import './Loading.css';

class Loading extends Component {
  render() {
    return (
      <div className="Loading">
        <div className="loading-logo-container">
          <FontAwesomeIcon className="loading-icon" icon={ faCompactDisc } />
        </div>
      </div>
    );
  }
}

export default Loading;
