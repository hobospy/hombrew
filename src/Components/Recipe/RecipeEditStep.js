import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import RecipeEditIngredient from './RecipeEditIngredient';

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

const CssTextFieldRightAligned = withStyles({
  input: {
    textAlign: 'right',
  },
})(CssTextField);

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

class RecipeEditStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      durationID: -1,
      durationType: '',
      //durationTypes: ['No duration', 'Independent', 'Before flameout', 'After flameout'],
      durationTypes: props.durationTypes,
      durationValue: '',
      durationVisible: false,
      editingExistingIngredient: false,
      hasLoaded: false,
      ingredients: [],
      newIngredient: null,
      newIngredientID: -1,
      updateStepAvailable: false,

      newIngredientRef: React.createRef(),
    };

    this.cancelEditStep = this.cancelEditStep.bind(this);
    this.validateStepObject = this.validateStepObject.bind(this);

    this.cancelAddIngredient = this.cancelAddIngredient.bind(this);
    this.addIngredient = this.addIngredient.bind(this);

    this.editIngredient = this.editIngredient.bind(this);
    this.cancelUpdateIngredient = this.cancelUpdateIngredient.bind(this);
    this.updateIngredient = this.updateIngredient.bind(this);

    this.deleteIngredient = this.deleteIngredient.bind(this);

    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    var ingredientList = [];
    var desc = this.props.description !== undefined ? this.props.description : '';
    var durType = this.state.durationTypes[0].value;
    var showDuration = false;
    var timerDisplayValue = '';

    if (this.props.ingredients !== undefined) {
      this.props.ingredients.forEach(function (arrayItem) {
        const obj = {
          id: arrayItem.id,
          name: arrayItem.name,
          amount: arrayItem.amount,
          unit: arrayItem.unit,
          type: arrayItem.type,
          inEdit: false,
        };

        ingredientList.push(obj);
      });
    }

    if (this.props.timer !== undefined && this.props.timer !== null) {
      showDuration = this.props.timer.type !== 'No duration';

      var valInSec = this.props.timer.duration;
      if (valInSec > 0) {
        const hours = Math.floor(valInSec / 3600);
        valInSec %= 3600;
        const minutes = Math.floor(valInSec / 60);
        const seconds = Math.floor(valInSec % 60);

        timerDisplayValue = `${`00${hours}`.slice(-2)}:${`00${minutes}`.slice(-2)}:${`00${seconds}`.slice(-2)}`;
      } else {
        timerDisplayValue = '00:00:00';
      }

      durType = this.props.timer.type;
    }

    this.setState(
      {
        description: desc,
        durationType: durType,
        durationValue: timerDisplayValue,
        durationVisible: showDuration,
        ingredients: ingredientList,
        hasLoaded: true,
      },
      this.validateStepObject
    );
  }

  cancelEditStep() {
    this.setState({
      description: '',
      durationType: 'No duration',
      durationVisible: false,
      editingExistingIngredient: false,
      ingredients: [],
      newIngredient: null,
      newIngredientID: -1,
    });

    this.state.newIngredientRef.current.clear();

    if (this.props.cancel !== undefined && this.props.cancel !== null) {
      this.props.cancel();
    }
  }

  validateStepObject() {
    var isAvailable = true;

    isAvailable = isAvailable && this.state.description !== '';

    if (isAvailable && this.state.durationType !== 0) {
      if (this.state.durationValue !== '') {
        var durationRegEx = /^[0-9]{2}:[0-9]{2}:[0-9]{2}$/;
        var isValid = durationRegEx.test(this.state.durationValue);
        isAvailable = isAvailable && isValid;
      } else {
        isAvailable = false;
      }
    }

    this.setState({ updateStepAvailable: isAvailable });
  }

  cancelAddIngredient() {
    console.log('Cancel adding an ingredient');
  }

  addIngredient(newIngredient) {
    var tempIngredientList = this.state.ingredients;
    tempIngredientList = tempIngredientList.concat(newIngredient);

    var newID = this.state.newIngredientID - 1;

    this.setState({ ingredients: tempIngredientList, newIngredientID: newID });
  }

  editIngredient = (ingredientID) => (event) => {
    if (!this.state.editingExistingIngredient) {
      var array = [...this.state.ingredients];

      var ingredientIndex = array.findIndex((e) => e.id === ingredientID);

      if (ingredientIndex !== -1) {
        let editIngredient = { ...array[ingredientIndex], inEdit: true };
        array[ingredientIndex] = editIngredient;

        this.setState({ ingredients: array, editingExistingIngredient: true });
      }
    }
  };

  cancelUpdateIngredient() {
    var array = [...this.state.ingredients];

    var ingredientIndex = array.findIndex((e) => e.inEdit === true);

    if (ingredientIndex !== -1) {
      let editIngredient = { ...array[ingredientIndex], inEdit: false };
      array[ingredientIndex] = editIngredient;

      this.setState({ ingredients: array, editingExistingIngredient: false });
    }
  }

  updateIngredient(updatedIngredient) {
    var array = this.state.ingredients;

    var ingredientIndex = array.findIndex((e) => e.id === updatedIngredient.id);

    if (ingredientIndex !== -1) {
      array[ingredientIndex] = updatedIngredient;

      this.setState({ ingredients: array, editingExistingIngredient: false });
    }
  }

  deleteIngredient = (ingredientID) => (event) => {
    event.preventDefault();

    var array = [...this.state.ingredients];
    var ingredientIndex = array.findIndex((e) => e.id === ingredientID);

    if (ingredientIndex !== -1) {
      array.splice(ingredientIndex, 1);
      this.setState({ ingredients: array });
    }
  };

  submit() {
    const durValue = this.state.durationValue;
    const hourSeparator = durValue.indexOf(':');
    const minuteSeparator = durValue.indexOf(':', hourSeparator + 1);
    var duration = 3600 * (isNaN(parseInt(durValue.substring(0, hourSeparator))) ? 0 : parseInt(durValue.substring(0, hourSeparator)));
    duration +=
      60 *
      (isNaN(parseInt(durValue.substring(hourSeparator + 1, minuteSeparator)))
        ? 0
        : parseInt(durValue.substring(hourSeparator + 1, minuteSeparator)));
    duration += isNaN(parseInt(durValue.substring(minuteSeparator + 1))) ? 0 : parseInt(durValue.substring(minuteSeparator + 1));

    var updatedStep = {
      id: this.props.stepID,
      description: this.state.description,
      ingredients: this.state.ingredients,
      timer:
        this.state.durationType === null || this.state.durationType === 0
          ? null
          : {
              type: this.state.durationType,
              duration: duration,
              id: this.state.durationID,
              recipeStepID: this.props.stepID
            },
      timerDisplayValue: this.state.durationValue,
      recipeID: this.props.recipeID,
    };

    this.setState({
      description: '',
      durationType: this.state.durationTypes[0].value,
      durationValue: '',
      durationVisible: false,
      ingredients: [],
      newIngredient: null,
    });

    this.props.submit(updatedStep);
  }

  render() {
    return (
      <div className="step-new-container">
        <div className="step-new-description">
          <CssTextField
            autoComplete="off"
            InputProps={{ disableUnderline: true }}
            id="Ingredient"
            placeholder="Description"
            value={this.state.description}
            onChange={(e) => {
              this.setState({ description: e.target.value }, this.validateStepObject);
            }}
          />
        </div>
        <div className="step-new-ingredients">
          <div className="step-new-ingredient-container">
            {this.state.ingredients.map((ingredient) => (
              <div>
                {ingredient.inEdit ? (
                  <RecipeEditIngredient
                    ingredient={{ name: ingredient.name, amount: ingredient.amount, unit: ingredient.unit, type: ingredient.type }}
                    ingredientID={ingredient.id}
                    ingredientTypes={this.props.ingredientTypes}
                    stepID={this.props.stepID}
                    submitText="Update"
                    unitsOfMeasure={this.props.unitsOfMeasure}
                    unitTypes={this.props.unitTypes}
                    cancel={this.cancelUpdateIngredient}
                    submit={this.updateIngredient}
                  />
                ) : (
                  <div className="step-new-ingredient-display">
                    <div className="step-new-ingredient-display-details" onClick={this.editIngredient(ingredient.id)}>
                      {ingredient.amount}
                      {(this.props.unitsOfMeasure.find(item => item.value === ingredient.unit)).description} - {ingredient.name}
                    </div>
                    <div className="step-new-ingredient-display-delete" onClick={this.deleteIngredient(ingredient.id)}>
                      <CSSIconButton arial-label="delete">
                        <DeleteIcon fontSize="small" />
                      </CSSIconButton>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {!this.state.editingExistingIngredient ? (
            <RecipeEditIngredient
              ref={this.state.newIngredientRef}
              className="step-new-ingredient-add"
              ingredient={this.state.newIngredient}
              ingredientID={this.state.newIngredientID}
              ingredientTypes={this.props.ingredientTypes}
              unitsOfMeasure={this.props.unitsOfMeasure}
              stepID={this.props.stepID}
              submitText="Add"
              cancel={this.cancelAddIngredient}
              submit={this.addIngredient}
            />
          ) : null}
        </div>
        <div className="step-new-duration">
          <CssTextField
            className="step-new-duration-type"
            fullWidth="false"
            InputProps={{ disableUnderline: true }}
            labelId={'NewDurationType'}
            id={'NewDurationType'}
            select
            value={this.state.durationType}
            onChange={(e) => {
              this.setState({ durationType: e.target.value }, this.validateStepObject);
              this.setState({ durationVisible: e.target.value !== 0 });
            }}
          >
            {this.state.durationTypes.map((dt) => (
              <MenuItem value={dt.value} key={dt.value}>
                <div>
                  <div>{dt.description}</div>
                </div>
              </MenuItem>
            ))}
          </CssTextField>
          {this.state.durationVisible ? (
            <CssTextFieldRightAligned
              className="step-new-duration-value"
              fullWidth="false"
              InputProps={{ disableUnderline: true }}
              id={'NewDuration'}
              key={'NewDuration'}
              placeholder="HH:MM:SS"
              value={this.state.durationValue}
              onChange={(e) => {
                this.setState({ durationValue: e.target.value }, this.validateStepObject);
              }}
            />
          ) : null}
        </div>
        <div className="step-new-commands">
          {this.props.showCancel === true ? <Button onClick={this.cancelEditStep}>Cancel</Button> : null}
          <Button className="inline-edit-button" disabled={!this.state.updateStepAvailable} onClick={this.submit}>
            {this.props.submitText}
          </Button>
        </div>
      </div>
    );
  }
}

export default RecipeEditStep;
