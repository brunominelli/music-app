import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
      loading: false,
    };
  }

  async componentDidMount() {
    this.onInputChange();
  }

  onInputChange = () => {
    this.setState({
      loading: true,
    }, async () => {
      const favorites = await getFavoriteSongs();
      const newFavorites = favorites.map((favorite) => favorite);
      this.setState({
        loading: false,
        favorites: newFavorites,
      });
    });
  }

  render() {
    const { favorites, loading } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-favorites">
          <h1>Favorites</h1>
          {loading
            ? <Loading />
            : (
              <section>
                {favorites.map((track, index) => (
                  <MusicCard
                    key={ index }
                    track={ track }
                    onInputChange={ this.onInputChange }
                  />
                ))}
              </section>
            )}
        </div>
      </>
    );
  }
}

export default Favorites;
