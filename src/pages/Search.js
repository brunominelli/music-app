import React, { Component } from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: true,
      search: '',
      isDisabled: true,
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

  handleSearch = ({ target: { value } }) => {
    const min = 2;
    if (value.length >= min) {
      this.setState({
        search: value,
        isDisabled: false,
      });
    } else {
      this.setState({
        search: value,
        isDisabled: true,
      });
    }
  }

  handleSearchButton = (event) => {
    event.preventDefault();
    this.setState({
      search: '',
      isDisabled: true,
    });
  }

  render() {
    const { user, loading, search, isDisabled } = this.state;
    return (
      <>
        <Header user={ user } loading={ loading } />
        <div data-testid="page-search">
          <form>
            <input
              type="text"
              placeholder="Buscar..."
              data-testid="search-artist-input"
              value={ search }
              onChange={ this.handleSearch }
            />
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ isDisabled }
              onClick={ this.handleSearchButton }
            >
              Pesquisar
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Search;
