import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      check: false,
      loading: false,
    };
  }

  async componentDidMount() {
    const { track } = this.props;
    const favorites = await getFavoriteSongs();
    this.setState({
      check: favorites.some((song) => song.trackId === track.trackId),
    });
  }

  // componentDidUpdate(prevState, nextState) {}

  handleChange = async (event, track) => {
    const { check } = this.state;
    const checked = event.target;
    this.setState({
      loading: true,
      check: checked,
    }, async () => {
      if (check) {
        await addSong(track);
      } else {
        await removeSong(track);
      }
      this.setState({
        check: !(check),
        loading: false,
      });
    });
  }

  render() {
    const { track } = this.props;
    const { trackName, trackId, previewUrl } = track;
    const { loading, check } = this.state;
    return (
      <div>
        {loading ? <Loading />
          : (
            <div>
              <h4>{trackName}</h4>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
              <div>
                <label htmlFor={ `favorite-${trackId}` }>
                  Favorita
                  {' '}
                  <input
                    type="checkbox"
                    id={ `favorite-${trackId}` }
                    data-testid={ `checkbox-music-${trackId}` }
                    onChange={ (event) => this.handleChange(event, track) }
                    checked={ check }
                  />
                </label>
              </div>
            </div>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MusicCard;
