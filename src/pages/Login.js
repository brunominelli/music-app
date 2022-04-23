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
      <div data-testid="page-login" className="container">
        {loading
          ? <Loading />
          : (
            <section className="flex-container col">
              <figure className="block">
                <img
                  src={ images.trybetunesLogo.src }
                  alt={ images.trybetunesLogo.alt }
                  className="image"
                />
              </figure>
              <form className="form-login">
                <input
                  type="text"
                  placeholder="Nome"
                  data-testid="login-name-input"
                  name="user"
                  value={ user }
                  onChange={ this.handleInput }
                  className="block input-login"
                />
                <button
                  type="submit"
                  data-testid="login-submit-button"
                  disabled={ isDisabled }
                  value={ user }
                  onClick={ this.handleButton }
                  className="block button button-blue"
                >
                  Entrar
                </button>
              </form>
            </section>
          )}
        { redirect ? <Redirect to="/search" /> : null }
      </div>
    );
  }
}

export default Login;
