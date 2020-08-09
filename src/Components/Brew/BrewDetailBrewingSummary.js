import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';

import CountdownButton from '../SupportComponents/CountdownButton';
import LoadingIndicator from '../SupportComponents/LoadingIndicator';

class BrewDetailBrewingSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [],
      notes: this.props.notes,
      hasLoaded: false,
    };
  }

  componentDidMount() {
    var stepList = [];
    if (this.props.steps !== undefined) {
      this.props.steps.forEach(function (arrayItem) {
        const obj = {
          description: arrayItem.description,
          id: arrayItem.id,
          timer: arrayItem.timer,
          ingredients: arrayItem.ingredients,
          completed: false,
        };

        stepList.push(obj);
      });
    }

    this.setState({ steps: stepList, hasLoaded: true });
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

    return (
      <div>
        {this.state.hasLoaded ? (
          <Fragment>
            <div className="brewing-summary-container">
              <div className="brew-summary-container-steps">
                Brewing Steps
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

                        {/* {step.ingredients !== undefined ? (
                          <div>
                            {step.ingredients.map((ingredient, ingedientID) => (
                              <span>{ingredient.name}</span>
                            ))}
                          </div>
                        ) : (
                          <span>No ingredients</span>
                        )} */}
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
              <div className="brew-summary-container-notes">Brewing notes</div>
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
