import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import AfterFlameout from '../../resources/AfterFlameout.png';
import BeforeFlameout from '../../resources/BeforeFlameout.png';
import LoadingIndicator from '../SupportComponents/LoadingIndicator';
import RecipeEditStep from './RecipeEditStep';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#001a33',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#001a33',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#001a33',
      },
    },
  },
})(TextField);

const CSSIconButton = withStyles({
  root: {
    border: '1px solid #b4b4b4',
    color: '#001a33',
    height: '32px',
    width: '32px',
    '&:hover': {
      background: '#b4b4b4',
    },
  },
})(IconButton);

class RecipeEdit_Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      durationTypes: ['No duration', 'Independent', 'Before flameout', 'After flameout'],
      editingStep: false,
      hasLoaded: false,
      newStepID: -1,
      steps: [],
    };

    this.updateStep = this.updateStep.bind(this);
    this.cancelUpdateStep = this.cancelUpdateStep.bind(this);
    this.addStep = this.addStep.bind(this);
    this.deleteStep = this.deleteStep.bind(this);
  }

  componentDidMount() {
    var stepList = [];

    if (this.props.steps !== undefined) {
      this.props.steps.forEach(function (arrayItem) {
        const obj = {
          id: arrayItem.id,
          description: arrayItem.description,
          ingredients: arrayItem.ingredients,
          timer: arrayItem.timer,
          timerDisplayValue: '',
          recipeID: arrayItem.recipeID,
          inEdit: false,
        };

        if (arrayItem.timer !== null) {
          var valInSec = arrayItem.timer.duration;

          if (valInSec > 0) {
            const hours = Math.floor(valInSec / 3600);
            valInSec %= 3600;
            const minutes = Math.floor(valInSec / 60);
            const seconds = Math.floor(valInSec % 60);

            obj.timerDisplayValue = `${`00${hours}`.slice(-2)}:${`00${minutes}`.slice(-2)}:${`00${seconds}`.slice(-2)}`;
          } else {
            obj.timerDisplayValue = '00:00:00';
          }
        }

        stepList.push(obj);
      });
    }

    this.setState({ steps: stepList, hasLoaded: true });
  }

  editStep = (stepID) => (event) => {
    if (!this.state.editingStep) {
      var array = [...this.state.steps];
      var stepIndex = array.findIndex((e) => e.id === stepID);

      if (stepIndex !== -1) {
        let editStep = { ...array[stepIndex], inEdit: true };
        array[stepIndex] = editStep;

        this.setState({ steps: array, editingStep: true });
      }
    }
  };

  updateStep(updatedStep) {
    var array = [...this.state.steps];
    var stepIndex = array.findIndex((e) => e.id === updatedStep.id);

    if (stepIndex !== -1) {
      var updatedStepItem = {
        id: updatedStep.id,
        description: updatedStep.description,
        ingredients: updatedStep.ingredients,
        timer: updatedStep.timer,
        recipeID: updatedStep.recipeID,
        timerDisplayValue: updatedStep.timerDisplayValue,
        inEdit: false,
      };

      array[stepIndex] = updatedStepItem;

      this.setState({ steps: array });
    }

    this.setState({ editingStep: false });

    this.props.onUpdateStep(updatedStep);
  }

  cancelUpdateStep() {
    var array = [...this.state.steps];
    var stepIndex = array.findIndex((e) => e.inEdit === true);

    if (stepIndex !== -1) {
      let editStep = { ...array[stepIndex], inEdit: false };
      array[stepIndex] = editStep;

      this.setState({ steps: array, editingStep: false });
    }
  }

  addStep(newStep) {
    var tempStepList = this.state.steps;

    var newStepItem = {
      id: newStep.id,
      description: newStep.description,
      ingredients: newStep.ingredients,
      timer: newStep.timer,
      recipeID: newStep.recipeID,
      timerDisplayValue: newStep.timerDisplayValue,
      inEdit: false,
    };

    tempStepList = tempStepList.concat(newStepItem);

    var newID = this.state.newStepID - 1;

    this.setState({ steps: tempStepList, newStepID: newID });

    this.props.onAddStep(newStepItem);
  }

  deleteStep = (stepID) => (event) => {
    var array = [...this.state.steps];
    var stepIndex = array.findIndex((e) => e.id === stepID);
    var editingItem = false;

    if (stepIndex !== -1) {
      editingItem = array[stepIndex].inEdit;
      array.splice(stepIndex, 1);

      this.setState({ steps: array });
    }

    if (editingItem) {
      this.setState({ editingStep: false });
    }

    this.props.onDeleteStep(stepID)(event);
  };

  render() {
    if (this.props.currentStep !== 2) {
      return null;
    }

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
          <div>
            <div className="edit-page-container-item, useStyles.root">
              <div className="edit-page-recipe-title-container">Directions</div>
              <div
                style={{
                  marginTop: 15,
                  marginLeft: 10,
                  maxHeight: this.state.editingStep ? 550 : 300,
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  marginBottom: 5,
                }}
              >
                {this.state.steps.map((step, index) => (
                  <div>
                    {step.inEdit === false ? (
                      <div>
                        <div className="step-edit-readonly-container">
                          <div className="step-edit-readonly-index" onClick={this.editStep(step.id)}>
                            {index + 1}.
                          </div>
                          <div className="step-edit-readonly-description" onClick={this.editStep(step.id)}>
                            <CssTextField
                              fullWidth
                              InputProps={{ disableUnderline: true }}
                              id={step.id}
                              key={step.id}
                              multiline
                              value={step.description}
                            />
                          </div>
                          <div className="step-edit-readonly-duration" onClick={this.editStep(step.id)}>
                            {step.timer !== null ? (
                              <div className="step-edit-readonly-duration-container">
                                <div className="step-edit-readonly-duration-value">{step.timerDisplayValue}</div>
                                {step.timer.type !== 'Independent' ? (
                                  <div className="step-edit-readonly-duration-icon">
                                    {step.timer.type === 'Before flameout' ? <img src={BeforeFlameout} alt="" /> : <img src={AfterFlameout} alt="" />}
                                  </div>
                                ) : null}
                              </div>
                            ) : null}
                          </div>
                          <div className="step-edit-readonly-ingredients" onClick={this.editStep(step.id)}>
                            {step.ingredients.map((ingredient) => (
                              <div style={{ marginLeft: '30px' }}>
                                {ingredient.amount}
                                {ingredient.unit} - {ingredient.name}
                              </div>
                            ))}
                          </div>
                          <div className="step-edit-readonly-delete" onClick={this.deleteStep(step.id)}>
                            <CSSIconButton arial-label="delete">
                              <DeleteIcon fontSize="small" />
                            </CSSIconButton>
                          </div>
                        </div>
                        <ColoredLine color="lightgray" />
                      </div>
                    ) : (
                      <div>
                        <RecipeEditStep
                          cancel={this.cancelUpdateStep}
                          description={step.description}
                          ingredients={step.ingredients}
                          ingredientTypes={this.props.ingredientTypes}
                          unitTypes={this.props.unitTypes}
                          stepID={step.id}
                          recipeID={this.props.recipeID}
                          showCancel={true}
                          submit={this.updateStep}
                          submitText="Update"
                          timer={step.timer}
                        />
                        <ColoredLine color="lightgray" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {this.state.editingStep === false ? (
              <div className="step-new-container-surround">
                <label className="step-new-container-header">New step</label>
                <RecipeEditStep
                  ingredientTypes={this.props.ingredientTypes}
                  unitTypes={this.props.unitTypes}
                  stepID={this.state.newStepID}
                  recipeID={this.props.recipeID}
                  showCancel={true}
                  submit={this.addStep}
                  submitText="Add"
                />
              </div>
            ) : null}
          </div>
        ) : (
          <LoadingIndicator />
        )}
      </div>
    );
  }
}

export default RecipeEdit_Step2;
