import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      loading: false,
    };
  }

  async componentDidMount() {
    const { track } = this.props;
    const favorites = await getFavoriteSongs();
    this.setState({
      checked: favorites.some((favorite) => favorite.trackId === track.trackId),
    });
  }

  handleChange = (event, track) => {
    const { onInputChange } = this.props;
    const { checked } = event.target;
    this.setState({
      loading: true,
      checked: false,
    }, async () => {
      if (checked) {
        await addSong(track);
      } else {
        await removeSong(track);
      }
      this.setState({
        loading: false,
        checked,
      }, onInputChange);
    });
  }

  render() {
    const { track } = this.props;
    const { loading, checked } = this.state;
    return (
      <div>
        {loading ? <Loading />
          : (
            <div>
              <h4>{track.trackName}</h4>
              <audio data-testid="audio-component" src={ track.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
              <div>
                <label htmlFor={ `favorite-${track.trackId}` }>
                  Favorita
                  {' '}
                  <input
                    type="checkbox"
                    id={ `favorite-${track.trackId}` }
                    data-testid={ `checkbox-music-${track.trackId}` }
                    checked={ checked }
                    onChange={ (event) => this.handleChange(event, track) }
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
  onInputChange: PropTypes.func.isRequired,
};

export default MusicCard;
