import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

class LoadingIndicator extends Component {
  render() {
    return (
      <div className="CentreLoadingIndicator">
        <CircularProgress color="inherit" size="4em" />
        <div>Still loading ...</div>
      </div>
    );
  }
}

export default LoadingIndicator;
