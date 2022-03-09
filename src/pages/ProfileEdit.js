import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      isDisabled: true,
      redirect: false,
      name: '',
      email: '',
      description: '',
      image: '',
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const { name, email, description, image } = await getUser();
      this.setState({
        name,
        email,
        description,
        image,
        loading: false,
      }, this.setButton);
    });
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.setButton());
  }

  setButton = () => {
    const { name, email, description, image } = this.state;
    const regex = /\S+@\S+\.\S+/;
    let control = !regex.test(email);
    if (!name && !description && !image) {
      control = true;
    }
    this.setState({
      isDisabled: control,
    });
  }

  setProfile = () => {
    const { name, email, description, image } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      await updateUser({ name, email, description, image });
      this.setState({
        loading: false,
        redirect: true,
      });
    });
  }

  render() {
    const {
      loading, isDisabled, redirect,
      name, email, description, image } = this.state;
    if (redirect) { return (<Redirect to="/profile" />); }
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">
          <h1>Profile Edit</h1>
          {loading
            ? <Loading />
            : (
              <form>
                <input
                  type="text"
                  placeholder="Nome"
                  data-testid="edit-input-name"
                  name="name"
                  value={ name }
                  onChange={ this.handleInput }
                />
                <input
                  type="email"
                  placeholder="Email"
                  data-testid="edit-input-email"
                  name="email"
                  value={ email }
                  onChange={ this.handleInput }
                />
                <input
                  type="text"
                  placeholder="Descrição"
                  data-testid="edit-input-description"
                  name="description"
                  value={ description }
                  onChange={ this.handleInput }
                />
                <input
                  type="text"
                  data-testid="edit-input-image"
                  name="image"
                  value={ image }
                  onChange={ this.handleInput }
                />
                <button
                  type="button"
                  data-testid="edit-button-save"
                  disabled={ isDisabled }
                  onClick={ this.setProfile }
                >
                  Editar perfil
                </button>
              </form>
            )}
        </div>
      </>
    );
  }
}

export default ProfileEdit;
