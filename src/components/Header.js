import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

class Header extends Component {
  render() {
    const { user, loading } = this.props;
    return (
      <header data-testid="header-component">
        {
          loading
            ? <Loading />
            : <p data-testid="header-user-name">{ user }</p>
        }
      </header>
    );
  }
}

Header.propTypes = {
  user: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Header;
