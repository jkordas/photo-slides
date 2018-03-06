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
  constructor(props) {
    super(props);

    store.readFiles(filesLoadedCallback.bind(this));
    this.state = {
      images: [],
      index: 0
    };

    function filesLoadedCallback(images) {
      this.setState({images});
    }

  }
  intervalId = null;

  onKeyDown = evt => {
    console.log(evt.key);
    if (evt.key === 'ArrowRight') {
      this.goForward();
    }
    if (evt.key === 'ArrowLeft') {
      this.goBack();
    }
  };

  goBack = () => {
    //NOTE: add this.state.images.length to always have positive number
    const index = (this.state.index - 1 + this.state.images.length) % this.state.images.length;
    this.setState({index});
  };
  goForward = () => {
    const index = (this.state.index + 1) % this.state.images.length;
    this.setState({index});
  };

  pause = () => {
    clearInterval(this.intervalId);
  };

  play = () => {
    this.goForward();

    this.intervalId = setInterval(() => this.goForward(), 3000);
  };

  render() {
    console.log(this.state.images);
    console.log(this.state.index);
    return (
      <div className='main-container' onKeyDown={this.onKeyDown} tabIndex="0">
        <div className='image-container'>
          <img src={this.state.images[this.state.index]} className='image'/>
        </div>
        <div className='control-panel-container' onKeyPress={this.onKeyDown}>
          <ControlPanel goBack={this.goBack} goForward={this.goForward} pause={this.pause}
                        play={this.play}/>
        </div>
      </div>
    )
  }
}
