import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import BrewDetailBrewedNotes from './BrewDetailBrewedNotes';
import CountdownButton from '../SupportComponents/CountdownButton';
import FlameoutStepper from '../SupportComponents/FlameoutStepper';
import LoadingIndicator from '../SupportComponents/LoadingIndicator';

class BrewDetailBrewingSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [],
      brewingNotes: this.props.brewingNotes,
      flameoutSteps: [],
      hasLoaded: false,
    };
  }

  componentDidMount() {
    var stepList = [];
    var flameoutStepList = [];

    console.log("About to output the timer types:");

    if (this.props.steps !== undefined) {
      this.props.steps.forEach(function (arrayItem) {
        const stepObj = {
          description: arrayItem.description,
          id: arrayItem.id,
          timer: arrayItem.timer,
          ingredients: arrayItem.ingredients,
          completed: false,
        };

        console.log(arrayItem.timer.type);

        stepList.push(stepObj);

        if (arrayItem.timer.type !== 'Independent') {
          const flameoutStepObj = {
            displayText: arrayItem.description,
            duration: arrayItem.timer.duration * (arrayItem.timer.type === 'Before flameout' ? -1 : 1),
          };

          flameoutStepList.push(flameoutStepObj);
        }
      });
    }

    this.setState({ flameoutSteps: flameoutStepList, steps: stepList, hasLoaded: true });
  }

  stepCompleted = (stepID) => (event) => {
    var array = [...this.state.steps];
    var stepIndex = array.findIndex((e) => e.id === stepID);

    if (stepIndex !== -1) {
      let editStep = { ...array[stepIndex], completed: true };
      array[stepIndex] = editStep;

      this.setState({ steps: array });
    }
  };

  render() {
    const ColoredLine = ({ color }) => (
      <hr
        style={{
          color: color,
          background: color,
          height: 0.3,
        }}
      />
    );

    const largeScreenSize = window.innerWidth > 600; // useMediaQuery('(min-width:600px)');

    return (
      <div>
        {this.state.hasLoaded ? (
          <Fragment>
            <div className="brewing-summary-container">
              <div className="brew-summary-container-steps">
                {largeScreenSize ? (
                  <div>
                    <div className="brewed-beer-tasting-note-title plain-header">Brewing Steps</div>
                    {this.state.steps.map((step) => (
                      <div>
                        <div className="brew-summary-steps-container">
                          <div className="brew-summary-completion-step">
                            <div>{step.description}</div>
                            {step.ingredients.map((ingredient, ingedientID) => (
                              <div style={{ marginLeft: '50px' }}>
                                {ingredient.amount}
                                {ingredient.unit} - {ingredient.name}
                              </div>
                            ))}
                          </div>
                          <div className="brew-summary-completion-button">
                            {step.timer !== 0 ? (
                              <CountdownButton
                                className="brew-summary-completion-button"
                                duration={step.timer.duration * 1000}
                                completionText="Completed"
                              />
                            ) : (
                              <Button
                                className="brew-summary-completion-button"
                                variant="outlined"
                                style={{ backgroundColor: step.completed ? 'green' : '#FFBF00' }}
                                onClick={this.stepCompleted(step.id)}
                              >
                                {step.completed ? <span>Completed</span> : <span>Complete</span>}
                              </Button>
                            )}
                          </div>
                        </div>
                        <ColoredLine color="lightgray" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <div className="brewed-beer-tasting-note-title plain-header">Brewing Steps</div>
                    {this.state.steps.map((step) => (
                      <div>
                        <div className="brew-summary-steps-container-mobile">
                          <div className="brew-summary-completion-step-mobile">
                            <div>{step.description}</div>
                            {step.ingredients.map((ingredient, ingedientID) => (
                              <div style={{ marginLeft: '50px' }}>
                                {ingredient.amount}
                                {ingredient.unit} - {ingredient.name}
                              </div>
                            ))}
                          </div>
                          <div className="brew-summary-completion-button-mobile">
                            {step.timer !== 0 ? (
                              <CountdownButton
                                className="brew-summary-completion-button"
                                duration={step.timer.duration * 1000}
                                completionText="Completed"
                              />
                            ) : (
                              <Button
                                className="brew-summary-completion-button"
                                variant="outlined"
                                style={{ backgroundColor: step.completed ? 'green' : '#FFBF00' }}
                                onClick={this.stepCompleted(step.id)}
                              >
                                {step.completed ? <span>Completed</span> : <span>Complete</span>}
                              </Button>
                            )}
                          </div>
                        </div>
                        <ColoredLine color="lightgray" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="brew-summary-container-notes">
                <BrewDetailBrewedNotes baseUrl={this.props.baseUrl} brewingNotes={this.state.brewingNotes} url={this.state.url} />
              </div>
              {this.state.flameoutSteps.length >= 2 ? <FlameoutStepper steps={this.state.flameoutSteps} /> : null}
            </div>
          </Fragment>
        ) : (
          <LoadingIndicator />
        )}
      </div>
    );
  }
}

export default BrewDetailBrewingSummary;
