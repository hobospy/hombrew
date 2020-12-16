/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';

import FlameoutStep from './FlameoutStep';
import LoadingIndicator from './LoadingIndicator';

class FlameoutStepper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flameoutSteps: [],
      hasLoaded: false,
      stepperWidth: 100,
    };
  }

  componentDidMount() {
    // Determine the max difference of time
    var minValue = Math.min.apply(
      Math,
      this.props.steps.map(function (s) {
        return s.duration;
      })
    );
    var maxValue = Math.max.apply(
      Math,
      this.props.steps.map(function (s) {
        return s.duration;
      })
    );
    var trueMaxValue = maxValue >= 0 ? maxValue : 0;
    var range = Math.abs(trueMaxValue - minValue);

    var browserWidth = Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
    var rightMargin = 250 ;

    // Determine pixel width per 10 seconds
    var stepWidth = range === 0 ? 1 : (browserWidth - rightMargin) / range;
    var zeroPos = browserWidth - rightMargin - trueMaxValue * stepWidth;

    var flameoutStepList = [];
    var tempIndex = 0;
    var arrayLength = this.props.steps.length;
    this.props.steps.forEach(function (arrayItem) {
      var xPos = zeroPos + arrayItem.duration * stepWidth;
      xPos -= tempIndex > 0 ? 50 : 0;
      const obj = {
        displayText: arrayItem.displayText,
        xPos: tempIndex === arrayLength - 1 ? browserWidth - rightMargin : xPos,
        emphasised: tempIndex === 1 ? true : false,
      };

      flameoutStepList.push(obj);

      ++tempIndex;
    });

    this.setState({ stepperWidth: browserWidth - rightMargin, flameoutSteps: flameoutStepList, hasLoaded: true });
  }

  // Takes in two properties: text and emphasise
  // When emphasised it will expand the icon and increase text size

  render() {
    return (
      <div>
        {this.state.hasLoaded ? (
          <div style={{ position: 'relative', marginTop: '15px' }}>
            <div
              className="progressBarProgress"
              style={{ left: '75px', top: '38px', width: this.state.stepperWidth, height: '10px', zIndex: '-1' }}
            />
            {this.state.flameoutSteps.map((step, index) => (
              <div style={{ position: 'absolute', left: step.xPos, top: '5px', zIndex: '1' }}>
                <FlameoutStep displayText={step.displayText} emphasised={step.emphasised} />
              </div>
            ))}
          </div>
        ) : (
          <LoadingIndicator />
        )}
      </div>
    );
  }
}

export default FlameoutStepper;
