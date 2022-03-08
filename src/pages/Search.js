import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      search: '',
      currentSearch: '',
      searchResult: [],
      isDisabled: true,
    };
  }

  handleAPI = async (search) => {
    const result = await searchAlbumsAPI(search);
    console.log(result);
    this.setState({
      loading: false,
      search: '',
      currentSearch: search,
      searchResult: result,
    });
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.setState({
      search: value,
      isDisabled: value.length <= 1,
    }));
  }

  handleSearchButton = async (event) => {
    event.preventDefault();
    const { value } = event.target;
    this.setState({
      loading: true,
    }, async () => { if (value) this.handleAPI(value); });
  }

  render() {
    const { loading, search, currentSearch, searchResult, isDisabled } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <h1>Search</h1>
          {
            loading
              ? <Loading />
              : (
                <>
                  <form>
                    <input
                      type="text"
                      placeholder="Buscar..."
                      data-testid="search-artist-input"
                      value={ search }
                      onChange={ this.handleInput }
                    />
                    <button
                      type="submit"
                      data-testid="search-artist-button"
                      disabled={ isDisabled }
                      value={ search }
                      onClick={ this.handleSearchButton }
                    >
                      Pesquisar
                    </button>
                  </form>
                  {!searchResult.length
                    ? <p>Nenhum álbum foi encontrado</p>
                    : (
                      <article>
                        <h2>
                          Resultado de álbuns de:
                          {' '}
                          { currentSearch }
                        </h2>
                        <section>
                          {
                            searchResult.map((result, index) => (
                              <Link
                                key={ index }
                                data-testid={ `link-to-album-${result.collectionId}` }
                                to={ `/album/${result.collectionId}` }
                              >
                                <figure>
                                  <img
                                    src={ result.artworkUrl100 }
                                    alt={ result.collectionName }
                                  />
                                  <figcaption>
                                    { result.collectionName }
                                  </figcaption>
                                </figure>
                              </Link>
                            ))
                          }
                          )
                        </section>
                      </article>
                    )}
                </>
              )
          }
        </div>
      </>
    );
  }
}

export default Search;
