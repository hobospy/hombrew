import React, { Component } from 'react';

import AdjustOutlinedIcon from '@material-ui/icons/AdjustOutlined';
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';

import FlameoutStepTextBox from './FlameoutStepTextBox';

class FlameoutStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false,
      displayText: this.props.displayText,
      emphasised: this.props.emphasised,
    };
  }

  // Takes in two properties: text and emphasise
  // When emphasised it will expand the icon and increase text size

  render() {
    return (
      <div>
        {this.state.emphasised ? (
          <div style={{ marginTop: '-25px', color: 'red' }}>
            <FlameoutStepTextBox displayText={this.state.displayText} emphasised={this.state.emphasised} height='45px' justification='flex-end' width='300px'/>
            <div style={{ width: '300px', display: 'flex', justifyContent: 'space-between' }}>
              <div></div>
              <div style={{ backgroundColor: 'white', marginLeft: '5px', marginRight: '5px' }}>
                {/* Need a line on either side of this that aligns with the remainder of the line */}
                <FiberManualRecordOutlinedIcon fontSize="large" />
              </div>
              <div></div>
            </div>
          </div>
        ) : (
          <div style={{ marginTop: '25px', color: 'green' }}>
            <div style={{ width: '150px', display: 'flex', justifyContent: 'space-between' }}>
              <div></div>
              <div style={{ backgroundColor: 'white', marginLeft: '5px', marginRight: '5px' }}>
                <AdjustOutlinedIcon fontsize="small" />
              </div>
              <div></div>
            </div>
            <FlameoutStepTextBox displayText={this.state.displayText} emphasised={this.state.emphasised} height='45px' justification='flex-start' width='150px' />
          </div>
        )}
      </div>
    );
  }
}

export default FlameoutStep;
