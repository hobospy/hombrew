import React, { Component } from 'react';

class FlameoutStepTextBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
          hasLoaded: false,
          displayText: this.props.displayText,
          emphasised: this.props.emphasised,
          width: this.props.width,
          height: this.props.height,
          justification: this.props.justification,
        };
      }

    render() {

        var fontWeight = this.state.emphasised ? 'bold' : 'normal';

        return(
            <div style={{ display: 'flex', height: this.state.height, flexDirection: 'column', fontWeight: fontWeight, justifyContent: this.state.justification, maxHeight: this.state.height, overflow: 'hidden' }}>
                <div style={{ maxHeight: this.state.height, overflow: 'break-word', textAlign: 'center', whiteSpace: 'pre-wrap', width: this.state.width }}>
                    {this.state.displayText}
                </div>
            </div>
        );
    }
}

export default FlameoutStepTextBox;