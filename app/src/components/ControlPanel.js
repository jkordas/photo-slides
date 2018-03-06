import React, {Component} from 'react'
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui-icons/ArrowBack';
import ArrowForward from 'material-ui-icons/ArrowForward';
import PlayArrow from 'material-ui-icons/PlayArrow';
import Pause from 'material-ui-icons/Pause';


export default class ControlPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false
    }
  }

  pause = () => {
    this.setState({playing: false});
    this.props.pause();
  };

  play = () => {
    this.setState({playing: true});
    this.props.play();
  };

  render() {
    return (
      <div>
        <IconButton onClick={this.props.goBack}>
          <ArrowBack/>
        </IconButton>
        {this.state.playing &&
        <IconButton onClick={this.pause}>
          <Pause/>
        </IconButton>
        }
        {!this.state.playing &&
        <IconButton onClick={this.play}>
          <PlayArrow/>
        </IconButton>
        }
        <IconButton onClick={this.props.goForward}>
          <ArrowForward/>
        </IconButton>
      </div>
    )
  }
}
