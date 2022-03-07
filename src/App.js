import React from 'react';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Loading from './pages/Loading';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import { createUser } from './services/userAPI';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      setSearch: false,
      setRedirect: false,
      user: '',
    };
  }

  handleSearch = async () => {
    const { user } = this.state;
    await createUser({ name: user });
    this.setState({
      user: '',
      setSearch: true,
    });
  }

  handleLoginButton = (event) => {
    event.preventDefault();
    this.setState({
      setSearch: false,
      setRedirect: true,
    }, this.handleSearch);
  }

  handleLogin = ({ target: { value } }) => {
    const min = 3;
    if (value.length >= min) {
      this.setState({
        isDisabled: false,
        user: value,
      });
    } else {
      this.setState({
        isDisabled: true,
        user: value,
      });
    }
  }

  render() {
    const { isDisabled, setSearch, setRedirect, user } = this.state;
    return (
      <>
        <p>Trybetunes</p>
        <BrowserRouter>
          <Switch>
            <Route path="/profile/edit" component={ ProfileEdit } />
            <Route exact path="/profile" component={ Profile } />
            <Route path="/album/:id" component={ Album } />
            <Route path="/favorites" component={ Favorites } />
            <Route path="/search">
              {setSearch
                ? <Search />
                : <Loading />}
            </Route>
            <Route exact path="/">
              {setRedirect
                ? <Redirect to="/search" />
                : (
                  <Login
                    isDisabled={ isDisabled }
                    handleLogin={ this.handleLogin }
                    handleLoginButton={ this.handleLoginButton }
                    user={ user }
                  />)}
            </Route>
            <Route path="*" component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
