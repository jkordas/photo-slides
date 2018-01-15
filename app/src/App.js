import React, {Component} from 'react'
import {render} from 'react-dom'
import {} from './styles/global.css'
import Logo from './components/Logo.jsx'
import Link from './components/Link.js'
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

const logos = [
    require('./assets/electron.png'),
    require('./assets/react.png'),
    require('./assets/webpack.png')
];

const images = [
  require('../../images/DSC_0021.JPG')
];

export default class App extends Component {
    render() {
        const logosRender = logos.map( (logo, index) => {
            return <Logo key = {index} src = { logo } />
        });

        return (
            <div>
                {logosRender}

                <img src={images[0]} width={300}/>

            </div>
        )
    }
}
