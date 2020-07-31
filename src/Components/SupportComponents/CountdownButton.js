import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import AudioFile from '../../resources/audio/Ding.mp3';

class CountdownButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false,
      startTime: new Date(),
      endTime: 0,
      duration: this.props.duration,
      range: this.props.duration,
      countdownRunning: false,
      countdownFinished: false,
    };

    this.updateCountdown = this.updateCountdown.bind(this);
    this.updateRunningState = this.updateRunningState.bind(this);
    this.updateCountdownTimeText = this.updateCountdownTimeText.bind(this);
    this.updateCountdownTimeBar = this.updateCountdownTimeBar.bind(this);
  }

  updateRunningState() {
    if (!this.state.countdownFinished) {
      var newValue = !this.state.countdownRunning;
      this.setState({ countdownRunning: newValue });

      if (newValue) {
        this.setState({ endTime: new Date().getTime() + this.state.duration }, function () {
          this.updateCountdown();
        });
      } else {
        this.setState({ duration: this.state.endTime - new Date().getTime() });
      }
    }
  }

  componentDidMount() {
    this.setState({ hasLoaded: true });
    this.setState({ endTime: new Date(this.state.startTime.getTime() + this.state.range) }, function () {
      this.updateCountdownTimeText(this.state.range);
      this.updateCountdownTimeBar(this.state.range);
    });
  }

  updateCountdownTimeText(timeDiff) {
    var totalSeconds = timeDiff / 1000;
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.ceil(totalSeconds % 60);

    const progressBarText = document.getElementById('progressText');
    progressBarText.innerText = `${`00${hours}`.slice(-2)}:${`00${minutes}`.slice(-2)}:${`00${seconds}`.slice(-2)}`;
  }

  updateCountdownTimeBar(timeDiff) {
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = `${(100 * timeDiff) / this.state.range}%`;
  }

  updateCountdown() {
    if (this.state.countdownRunning) {
      const diff = Math.max(0, this.state.endTime - new Date());
      this.updateCountdownTimeText(diff);
      this.updateCountdownTimeBar(diff);

      if (diff > 0) {
        requestAnimationFrame(this.updateCountdown);
      } else {
        let audio = new Audio(AudioFile);
        audio.play();
        this.setState({ countdownFinished: true });
      }
    }
  }

  render() {
    return (
      <div>
        {this.state.hasLoaded ? (
          <Button onClick={this.updateRunningState} variant="outlined">
            {this.state.countdownFinished ? <DoneIcon /> : this.state.countdownRunning ? <PauseIcon /> : <PlayArrowIcon />}
            <div className="progressBarText" id="progressText" />
            <div className="progressBarProgress" id="progressBar" />
          </Button>
        ) : null}
      </div>
    );
  }
}

export default CountdownButton;
