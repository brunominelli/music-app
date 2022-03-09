import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: {},
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      user,
      loading: false,
    });
  }

  render() {
    const { user: { name, email, description, image }, loading } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile">
          <h1>Profile</h1>
          {loading
            ? <Loading />
            : (
              <section>
                <img
                  src={ image }
                  data-testid="profile-image"
                  alt={ `Imagem de ${name}` }
                />
                <p>{name}</p>
                <p>{email}</p>
                <p>{description}</p>
                <Link to="/profile/edit">Editar perfil</Link>
              </section>
            )}
        </div>
      </>
    );
  }
}

export default Profile;
