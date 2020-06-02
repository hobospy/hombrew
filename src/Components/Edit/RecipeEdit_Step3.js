import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';
import DeleteIcon from '@material-ui/icons/Delete';

import { withStyles } from '@material-ui/core/styles';

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

class RecipeEdit_Step3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false,
      editingStep: false,
      editDescription: '',
      editTimer: '',
      newStepID: -1,
      newDescription: '',
      newTimer: 0,
      steps: [],
    };

    this.updateEditStepDescription = this.updateEditStepDescription.bind(this);
    this.updateEditStepTimer = this.updateEditStepTimer.bind(this);
    this.updateNewStepDescription = this.updateNewStepDescription.bind(this);
    this.updateNewStepTimer = this.updateNewStepTimer.bind(this);
    this.editStep = this.editStep.bind(this);
    this.deleteStep = this.deleteStep.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.updateStep = this.updateStep.bind(this);
    this.addItemToStepList = this.addItemToStepList.bind(this);
  }

  componentDidMount() {
    var stepList = [];
    this.props.steps.forEach(function (arrayItem) {
      const obj = {
        id: arrayItem.id,
        description: arrayItem.description,
        timer: arrayItem.timer,
        inEdit: false,
      };

      stepList.push(obj);
    });

    this.setState({ steps: stepList });
    this.setState({ hasLoaded: true });
  }

  updateEditStepDescription(event) {
    this.setState({ editDescription: event.target.value });
  }

  updateEditStepTimer(event) {
    this.setState({ editTimer: event.target.value });
  }

  updateNewStepDescription(event) {
    this.setState({ newDescription: event.target.value });
  }

  updateNewStepTimer(event) {
    this.setState({ newTimer: event.target.value });
  }

  editStep = (stepID) => (event) => {
    var array = [...this.state.steps];
    var stepIndex = array.findIndex((e) => e.id === stepID);

    if (stepIndex !== -1) {
      let editStep = { ...array[stepIndex], inEdit: true };
      array[stepIndex] = editStep;

      this.setState({ editDescription: editStep.description });
      this.setState({ editTimer: editStep.timer });

      this.setState({ steps: array });
      this.setState({ editingStep: true });
    }
  };

  deleteStep = (stepID) => (event) => {
    event.preventDefault();

    var array = [...this.state.steps];
    var stepIndex = array.findIndex((e) => e.id === stepID);

    if (stepIndex !== -1) {
      array.splice(stepIndex, 1);
      this.setState({ steps: array });
    }

    // this.props.onDeleteIngredient(ingredientID)(event);
  };

  cancelEdit = (stepID) => (event) => {
    var array = [...this.state.steps];
    var stepIndex = array.findIndex((e) => e.id === stepID);

    if (stepIndex !== -1) {
      let editStep = { ...array[stepIndex], inEdit: false };
      array[stepIndex] = editStep;
      this.setState({ steps: array });
      this.setState({ editingStep: false });
    }
  };

  updateStep = (stepID) => (event) => {
    var array = [...this.state.steps];
    var stepIndex = array.findIndex((e) => e.id === stepID);

    if (stepIndex !== -1) {
      let editStep = {
        ...array[stepIndex],
        inEdit: false,
        description: this.state.editDescription,
        timer: this.state.editTimer,
      };
      array[stepIndex] = editStep;
      this.setState({ steps: array });
      this.setState({ editingStep: false });

      var ingEvent = event;
      ingEvent.target.name = 'UpdateStep';
      ingEvent.target.value = editStep;
      // this.props.handleChange(ingEvent);
    }
  };

  addItemToStepList(event) {
    const newStep = {
      id: this.state.newStepID,
      description: this.state.newDescription,
      timer: this.state.newTimer,
      inEdit: false,
    };

    this.setState({ steps: this.state.steps.concat(newStep) });
    this.setState({ newDescription: '' });
    this.setState({ newTimer: 0 });
    this.setState({ newStepID: this.state.newStepID - 1 });

    var ingEvent = event;
    ingEvent.target.name = 'AddStep';
    ingEvent.target.value = newStep;
    // this.props.handleChange(ingEvent);
  }

  render() {
    if (this.props.currentStep !== 3) {
      return null;
    }

    return (
      <div>
        {this.state.hasLoaded ? (
          <div>
            <div className="edit-page-recipe-title-container">Brewing steps</div>
            <div style={{ marginTop: 15, marginLeft: 10 }}>
              {this.state.steps.map((s, i) => (
                <div>
                  {s.inEdit === false ? (
                    <div className="edit-page-recipe-step-container">
                      <div className="edit-page-recipe-step-container-description">
                        <CssTextField
                          fullWidth
                          multiline
                          InputProps={{ disableUnderline: true }}
                          id={s.id}
                          key={s.id}
                          value={s.description}
                          onFocus={this.editStep(s.id)}
                        />
                      </div>
                      <div className="edit-page-recipe-step-container-timer">
                        <CssTextField
                          fullWidth
                          InputProps={{ disableUnderline: true }}
                          id={s.id}
                          key={s.id}
                          value={s.timer}
                          onFocus={this.editStep(s.id)}
                        />
                      </div>
                      <div className="edit-page-recipe-step-container-delete">
                        <Skeleton variant="circle" animation={false} width={30} height={30} onClick={this.deleteStep(s.id)}>
                          <DeleteIcon fontSize="small" />
                        </Skeleton>
                      </div>
                    </div>
                  ) : (
                    <div className="edit-ingredient-container">
                      <div className="inline-edit-recipe-container">
                        <div className="inline-edit-recipe-name">
                          <CssTextField
                            InputProps={{ disableUnderline: true }}
                            id="editDescription"
                            label="Description"
                            value={this.state.editDescription}
                            onChange={this.updateEditStepDescription}
                          />
                        </div>
                        <div className="inline-edit-recipe-amount">
                          <CssTextField
                            InputProps={{ disableUnderline: true }}
                            id="editTimer"
                            label="Timer"
                            value={this.state.editTimer.toString()}
                            onChange={this.updateEditStepTimer}
                          />
                        </div>
                      </div>
                      <div className="inline-edit-button-container">
                        <Button className="inline-edit-button" onClick={this.updateStep(s.id)}>
                          Update
                        </Button>
                        <Button className="inline-edit-button" onClick={this.cancelEdit(s.id)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {this.state.editingStep === false ? (
              <div className="test-group-container">
                <label className="test-group-container-header">New</label>
                <div className="new-ingredient-container">
                  <div className="inline-edit-recipe-container">
                    <div className="inline-edit-recipe-name">
                      <CssTextField
                        InputProps={{ disableUnderline: true }}
                        id="Description"
                        label="Description"
                        value={this.state.newDescription}
                        onChange={this.updateNewStepDescription}
                      />
                    </div>
                    <div className="inline-edit-recipe-amount">
                      <CssTextField
                        InputProps={{ disableUnderline: true }}
                        id="Timer"
                        label="Timer"
                        value={this.state.newTimer.toString()}
                        onChange={this.updateNewStepTimer}
                      />
                    </div>
                  </div>
                  <div className="inline-edit-button-container">
                    <Button className="inline-edit-button" onClick={this.addItemToStepList}>
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <div>Still loading</div>
        )}
      </div>
    );
  }
}

export default RecipeEdit_Step3;
