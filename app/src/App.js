import React, {Component} from 'react';
import {render} from 'react-dom';
import Jimp from 'jimp';

import {} from './styles/global.css';
import store from './store';
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
      image: null,
      index: 0
    };

    function filesLoadedCallback(images) {
      //TODO: load image
      Jimp.read(images[0].path, (err, img) => {
        img.getBase64(Jimp.AUTO, (err, result) => {
          this.setState({images, image: result});
        });
      });
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
    Jimp.read(this.state.images[index].path, (err, img) => {
      img.getBase64(Jimp.AUTO, (err, result) => {
        this.setState({index, image: result});
      });
    });
  };
  goForward = () => {
    const index = (this.state.index + 1) % this.state.images.length;
    Jimp.read(this.state.images[index].path, (err, img) => {
      img.exifRotate();
      img.getBase64(Jimp.AUTO, (err, result) => {
        this.setState({index, image: result});
      });
    });
  };

  pause = () => {
    clearInterval(this.intervalId);
  };

  play = () => {
    this.goForward();

    this.intervalId = setInterval(() => this.goForward(), 3000);
  };

  render() {
    // console.log(this.state.images);
    // console.log(this.state.index);
    // const image = this.state.images[this.state.index];
    // const className = image ? 'image orientation-' + image.orientation : 'image';

    return (
      <div className='main-container' onKeyDown={this.onKeyDown} tabIndex="0">
        <div className='image-container'>
          <img src={this.state.image} className='image'/>
        </div>
        <div className='control-panel-container' onKeyPress={this.onKeyDown}>
          <ControlPanel goBack={this.goBack} goForward={this.goForward} pause={this.pause}
                        play={this.play}/>
        </div>
      </div>
    );
  }
}
