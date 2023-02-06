import React from 'react';
import Routes from './Routes';
// import './styles/app.css';
import logo from './styles/logo.png';

class App extends React.Component {
  render() {
    return (
      <div className="container-login">
        <div className="login-page">
          <p className="trybe-tunes" alt="TrybeTunes" />
          <img src={ logo } alt="TrybeTunes" />
          <Routes />
        </div>
      </div>
    );
  }
}

export default App;
