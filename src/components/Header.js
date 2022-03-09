import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import images from '../data/images';

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
      <header data-testid="header-component" className="header">
        {loading
          ? <Loading />
          : (
            <>
              <div className="header-row">
                <img
                  src={ images.trybetunesLogoWhite.src }
                  alt={ images.trybetunesLogoWhite.alt }
                  className="header-logo"
                />
                <p data-testid="header-user-name" className="header-user">{ user }</p>
              </div>
              <div className="header-row header-row-white">
                <Link
                  data-testid="link-to-search"
                  to="/search"
                  className="button button-grey-green"
                >
                  Buscar
                </Link>
                <Link
                  data-testid="link-to-favorites"
                  to="/favorites"
                  className="button button-grey-green"
                >
                  Favoritas
                </Link>
                <Link
                  data-testid="link-to-profile"
                  to="/profile"
                  className="button button-grey-green"
                >
                  Perfil
                </Link>
              </div>
            </>
          )}
      </header>
    );
  }
}

export default Header;
