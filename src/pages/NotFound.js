import React, { Component } from 'react';
import images from '../data/images';

class NotFound extends Component {
  render() {
    return (
      <div data-testid="page-not-found" className="container col">
        <section className="block">
          <img src={ images.trybetunesLogo.src } alt={ images.trybetunesLogo.alt } />
        </section>
        <section className="container row">
          <h1 className="block title-not-found">Ops!</h1>
          <h3 className="block content-not-found">
            A página que você está procurando não foi encontrada.
          </h3>
        </section>
      </div>
    );
  }
}

export default NotFound;
