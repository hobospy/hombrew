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
      completionText: this.props.completionText,
      countdownRunning: false,
      countdownFinished: false,
      countdownTime: '',
      countdownBarWidth: '',
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
    var displayedText = '';

    if (totalSeconds > 0) {
      const hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = Math.floor(totalSeconds % 60);

      displayedText = `${`00${hours}`.slice(-2)}:${`00${minutes}`.slice(-2)}:${`00${seconds}`.slice(-2)}`;
    } else {
      if (this.state.completionText !== undefined && this.state.completionText !== '') {
        displayedText = this.state.completionText;
      } else {
        displayedText = '00:00:00';
      }
    }

    this.setState({ countdownTime: displayedText });
  }

  updateCountdownTimeBar(timeDiff) {
    this.setState({ countdownBarWidth: `${(100 * timeDiff) / this.state.range}%` });
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
          <Button
            onClick={this.updateRunningState}
            variant="outlined"
            style={
              this.state.countdownFinished && this.state.completionText !== undefined && this.state.completionText !== ''
                ? { backgroundColor: 'green' }
                : { backgroundColor: '#FFBF00' }
            }
          >
            {this.state.countdownFinished ? (
              this.state.completionText === undefined || this.state.completionText === '' ? (
                <DoneIcon />
              ) : null
            ) : this.state.countdownRunning ? (
              <PauseIcon />
            ) : (
              <PlayArrowIcon />
            )}
            <div
              style={
                this.state.countdownFinished && this.state.completionText !== undefined && this.state.completionText !== ''
                  ? { marginLeft: '4px', marginRight: '4px' }
                  : { marginLeft: '15px' }
              }
            >
              {this.state.countdownTime}
            </div>
            <div className="progressBarProgress" style={{ width: this.state.countdownBarWidth }} />
          </Button>
        ) : null}
      </div>
    );
  }
}

export default CountdownButton;
