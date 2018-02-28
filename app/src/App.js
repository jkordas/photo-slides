import React, {Component} from 'react'
import {render} from 'react-dom'
import {} from './styles/global.css'
import store from './store'
import ControlPanel from "./components/ControlPanel";

const remote = require("electron").remote;

document.addEventListener("keydown", event => {

  switch (event.key) {
    case "Escape":
      if (remote.getCurrentWindow().isFullScreen()) {
        remote.getCurrentWindow().setFullScreen(false);
      }
      break;
  }
});


export default class App extends Component {
  constructor() {
    super();

    store.readFiles(filesLoadedCallback.bind(this));
    this.state = {images: []};

    function filesLoadedCallback(images) {
      this.setState({images});
    }

  }

  render() {
    console.log(this.state.images[0]);
    return (
      <div className='main-container'>
        <div className='image-container'>
          <img src={this.state.images[0]} className='image'/>
        </div>
        <div className='control-panel-container'>
          <ControlPanel/>
        </div>
      </div>
    )
  }
}
