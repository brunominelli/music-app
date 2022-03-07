import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from './Loading';

class Header extends Component {
  render() {
    const { user, loading } = this.props;
    return (
      <header data-testid="header-component">
        {loading
          ? <Loading />
          : (
            <nav>
              <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
              <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
              <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
              <p data-testid="header-user-name">{ user }</p>
            </nav>
          )}
      </header>
    );
  }
}

Header.propTypes = {
  user: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Header;
