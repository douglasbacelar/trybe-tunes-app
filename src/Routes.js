import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

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
