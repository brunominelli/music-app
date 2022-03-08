import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const { name } = await getUser();
      this.setState({
        user: name,
        loading: false,
      });
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading
          ? <Loading />
          : (
            <div>
              <h1>Trybetunes</h1>
              <p data-testid="header-user-name">{ user }</p>
              <nav>
                <Link data-testid="link-to-search" to="/search">Buscar</Link>
                <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
                <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
              </nav>
            </div>
          )}
      </header>
    );
  }
}

export default Header;
