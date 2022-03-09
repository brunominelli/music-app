import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      songList: [],
      loading: true,
      album: {},
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const request = await getMusics(id);
    const songList = request.filter((song) => song.kind === 'song');
    const album = request[0];
    console.log(songList);
    this.setState({
      songList,
      loading: false,
      album,
    });
  }

  render() {
    const { songList, loading, album } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <h1>Album</h1>
          {loading
            ? <Loading />
            : (
              <section>
                <img
                  src={ album.artworkUrl100 }
                  alt={ album.collectionName }
                />
                <h2 data-testid="album-name">{album.collectionName}</h2>
                <h3 data-testid="artist-name">{album.artistName}</h3>
                {songList.map((track) => (
                  <MusicCard track={ track } key={ track.trackId } />
                ))}
              </section>
            )}
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Album;
