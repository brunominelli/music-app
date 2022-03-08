import React, { Component } from 'react';
import Header from '../components/Header';

class ProfileEdit extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">
          <h1>Profile Edit</h1>
        </div>
      </>
    );
  }
}

export default ProfileEdit;
