import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  render() {
    const { isDisabled, handleLogin, handleLoginButton } = this.props;
    return (
      <div data-testid="page-login">
        <form>
          <input
            type="text"
            placeholder="Nome"
            data-testid="login-name-input"
            onChange={ handleLogin }
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ isDisabled }
            onClick={ handleLoginButton }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleLoginButton: PropTypes.func.isRequired,
};

export default Login;
