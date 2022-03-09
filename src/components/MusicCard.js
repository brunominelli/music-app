import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: false,
    };
  }

  handleChange = async (event) => {
    const { checked } = event.target;
    const { track } = this.props;
    this.setState({
      loading: true,
      checked,
    }, async () => {
      await addSong(track);
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { track } = this.props;
    const { trackName, trackId, previewUrl } = track;
    const { loading, checked } = this.state;
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
                    onChange={ this.handleChange }
                    checked={ checked }
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
