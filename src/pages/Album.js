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
      trackList: [],
      loading: true,
      album: {},
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const request = await getMusics(id);
    const trackList = request.filter((song) => song.kind === 'song');
    const album = request[0];
    this.setState({
      trackList,
      loading: false,
      album,
    });
  }

  render() {
    const { trackList, loading, album } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          {loading
            ? <Loading />
            : (
              <section className="flex-container col">
                <div className="album-card">
                  <figure className="album-image">
                    <img
                      src={ album.artworkUrl100 }
                      alt={ album.collectionName }
                      className="album-image"
                    />
                    <figcaption className="album-legend">
                      <p
                        data-testid="album-name"
                        className="album-title"
                      >
                        {album.collectionName}
                      </p>
                      <p
                        data-testid="artist-name"
                        className="album-artist"
                      >
                        {album.artistName}
                      </p>
                    </figcaption>
                  </figure>
                </div>
                <div className="flex-container block">
                  {
                    trackList.map((track) => (
                      <MusicCard
                        key={ track.trackId }
                        track={ track }
                      />
                    ))
                  }
                </div>
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
