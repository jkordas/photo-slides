import React, {Component} from 'react'
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui-icons/ArrowBack';
import ArrowForward from 'material-ui-icons/ArrowForward';
import PlayArrow from 'material-ui-icons/PlayArrow';


export default class ControlPanel extends Component {

  render() {
    return (
      <div>
        <IconButton onClick={() => console.log('Clicked!')}>
          <ArrowBack/>
        </IconButton>
        <IconButton onClick={() => console.log('Clicked!')}>
          <PlayArrow/>
        </IconButton>
        <IconButton onClick={() => console.log('Clicked!')}>
          <ArrowForward/>
        </IconButton>
      </div>
    )
  }
}
