import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import images from '../data/images';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      redirect: false,
      user: '',
      isDisabled: true,
    };
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.setState({
      isDisabled: value.length <= 2,
    }));
  }

  handleButton = (event) => {
    event.preventDefault();
    const { value } = event.target;
    createUser({ name: value });
    this.setState({
      loading: true,
      redirect: true,
    });
  }

  render() {
    const { loading, redirect, user, isDisabled } = this.state;
    return (
      <div data-testid="page-login" className="flex-container">
        {loading
          ? <Loading />
          : (
            <>
              <figure className="flex-container-block">
                <img
                  src={ images.trybetunesLogo.src }
                  alt={ images.trybetunesLogo.alt }
                />
              </figure>
              <form className="flex-container-block">
                <div className="form-login">
                  <input
                    type="text"
                    placeholder="Nome"
                    className="form-input"
                    data-testid="login-name-input"
                    name="user"
                    value={ user }
                    onChange={ this.handleInput }
                  />
                  <button
                    type="submit"
                    className="button button-blue"
                    data-testid="login-submit-button"
                    disabled={ isDisabled }
                    value={ user }
                    onClick={ this.handleButton }
                  >
                    Entrar
                  </button>
                </div>
              </form>
            </>
          )}
        { redirect ? <Redirect to="/search" /> : null }
      </div>
    );
  }
}

export default Login;
