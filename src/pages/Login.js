import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

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
      <div data-testid="page-login">
        {loading
          ? <Loading />
          : (
            <form>
              <input
                type="text"
                placeholder="Nome"
                data-testid="login-name-input"
                name="user"
                value={ user }
                onChange={ this.handleInput }
              />
              <button
                type="submit"
                data-testid="login-submit-button"
                disabled={ isDisabled }
                value={ user }
                onClick={ this.handleButton }
              >
                Entrar
              </button>
            </form>
          )}
        { redirect ? <Redirect to="/search" /> : null }
      </div>
    );
  }
}

export default Login;
