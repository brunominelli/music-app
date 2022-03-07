import React, { Component } from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.handleUser();
  }

  handleUser = async () => {
    const user = await getUser();
    const username = user.name;
    this.setState({
      user: username,
      loading: false,
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <>
        <Header user={ user } loading={ loading } />
        <div data-testid="page-search" />
      </>
    );
  }
}

export default Search;
