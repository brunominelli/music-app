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
    this.setState({ loading: true });
    const favorites = await getFavoriteSongs();
    this.setState({
      favorites,
      loading: false,
    });
  }

  async handleFavorites() {
    const newFavorites = await getFavoriteSongs();
    this.setState({
      favorites: newFavorites,
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
                {favorites.map((track) => (
                  <MusicCard
                    track={ track }
                    key={ track.trackId }
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
