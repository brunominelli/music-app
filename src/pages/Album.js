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
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const songList = await getMusics(id);
    this.setState({
      songList,
      loading: false,
    });
  }

  handleSongList = async () => {
    const id = 'id523924661';
    const songList = await getMusics(id);
    console.log(songList);
  };

  render() {
    const { songList, loading } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <h1>Album</h1>
          {loading
            ? <Loading />
            : (
              <section>
                {console.log(songList)}
                <img
                  src={ songList[0].artworkUrl100 }
                  alt={ songList[0].collectionName }
                />
                <h2 data-testid="album-name">{songList[0].collectionName}</h2>
                <h3 data-testid="artist-name">{songList[0].artistName}</h3>
                {songList.map((track, index) => (
                  index > 0 && <MusicCard track={ track } key={ index } />
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
