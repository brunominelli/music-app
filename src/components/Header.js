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
      image: '',
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const { name, image } = await getUser();
      this.setState({
        user: name,
        image,
        loading: false,
      });
    });
  }

  render() {
    const { user, image, loading } = this.state;
    return (
      <header data-testid="header-component" className="header">
        {
          loading
            ? <Loading />
            : (
              <div className="header col">
                <div className="header">
                  <img
                    src={ images.trybetunesLogoWhite.src }
                    alt={ images.trybetunesLogoWhite.alt }
                    className="image-logo"
                  />
                  <div data-testid="icon-user" className="icon-user">
                    <img
                      src={ image }
                      alt={ `Foto de ${user}` }
                      className="icon-profile-image"
                    />
                    <p>{user}</p>
                  </div>
                </div>
                <div className="row">
                  <Link
                    data-testid="link-to-search"
                    to="/search"
                  />
                  <div className="row">
                    <Link
                      data-testid="link-to-search"
                      to="/search"
                      className="button button-grey"
                    >
                      Buscar
                    </Link>
                    <Link
                      data-testid="link-to-favorites"
                      to="/favorites"
                      className="button button-grey"
                    >
                      Favoritas
                    </Link>
                    <Link
                      data-testid="link-to-profile"
                      to="/profile"
                      className="button button-grey"
                    >
                      Perfil
                    </Link>
                  </div>
                </div>
              </div>
            )
        }
      </header>
    );
  }
}

export default Header;
