import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Album from './pages/album/Album';
import Favorites from './pages/favorites/Favorites';
import Login from './pages/login/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/profile/Profile';
import ProfileEdit from './pages/profile/ProfileEdit';
import Search from './pages/search/Search';

class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/album/:id" component={ Album } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/search" component={ Search } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile" component={ Profile } />
          <Route exact path="/" component={ Login } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default Routes;
