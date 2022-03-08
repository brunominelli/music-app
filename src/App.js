import React from 'react';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Loading from './components/Loading';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      setSearch: true,
      redirect: false,
    };
  }

  handleSearch = async () => {
    this.setState({
      setSearch: true,
    });
  }

  render() {
    const { setSearch, redirect } = this.state;
    return (
      <>
        <p>Trybetunes</p>
        <BrowserRouter>
          <Switch>
            <Route path="/profile/edit" component={ ProfileEdit } />
            <Route path="/profile" component={ Profile } />
            <Route path="/album/:id" component={ Album } />
            <Route path="/favorites" component={ Favorites } />
            <Route exact path="/search">
              {setSearch
                ? <Search />
                : <Loading />}
            </Route>
            <Route exact path="/">
              {redirect
                ? <Redirect to="/search" />
                : (
                  <Login />)}
            </Route>
            <Route path="*" component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
