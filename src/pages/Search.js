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
        <div data-testid="page-search" className="container-search">
          {
            loading
              ? <Loading />
              : (
                <>
                  <form className="container-search row">
                    <input
                      type="text"
                      placeholder="Buscar..."
                      data-testid="search-artist-input"
                      value={ search }
                      onChange={ this.handleInput }
                      className="form-input"
                    />
                    <button
                      type="submit"
                      data-testid="search-artist-button"
                      disabled={ isDisabled }
                      value={ search }
                      onClick={ this.handleSearchButton }
                      className="button button-search"
                    >
                      Pesquisar
                    </button>
                  </form>
                  {!searchResult.length
                    ? <h2 className="title-search">Nenhum álbum foi encontrado</h2>
                    : (
                      <article className="container-search">
                        <h2 className="title-search">
                          Resultado de álbuns de
                          {' '}
                          { currentSearch }
                          :
                        </h2>
                        <section className="container-search-result">
                          {
                            searchResult.map((result, index) => (
                              <Link
                                key={ index }
                                data-testid={ `link-to-album-${result.collectionId}` }
                                to={ `/album/${result.collectionId}` }
                                className="link"
                              >
                                <figure className="album-card">
                                  <img
                                    src={ result.artworkUrl100 }
                                    alt={ result.collectionName }
                                    className="album-image"
                                  />
                                  <figcaption className="album-legend">
                                    <p
                                      className="album-title"
                                    >
                                      { result.collectionName }
                                    </p>
                                    <p className="album-artist">{ result.artistName }</p>
                                  </figcaption>
                                </figure>
                              </Link>
                            ))
                          }
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
