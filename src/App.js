import React, { Component } from 'react';

import UploadCollection from './uploads/collection';

// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182

export default class App extends Component {

  componentDidMount() {
    document.addEventListener("keydown", event => {
      // F for fullscreen
      if(event.keyCode == 70) {
        document.documentElement.webkitRequestFullScreen();
      }
    });
  }
  

  render() {
    return (
      <div>
        <UploadCollection/>
      </div>
    );
  }
}
