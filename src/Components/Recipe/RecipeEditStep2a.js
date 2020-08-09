import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import LoadingIndicator from '../SupportComponents/LoadingIndicator';

import DurationIcon from '../../resources/durationIcon';

const CssButton = withStyles({
  root: {
    textTransform: 'none',
  },
})(Button);

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

class RecipeEdit_Step2a extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      ingredients: [],
      hasLoaded: false,
      newIngredient: '',
      newIngredientType: 'Grains',
      newIngredientAmount: '',
      newIngredientUnit: 'kg',
      newIngredientID: -1,
      editIngredient: '',
      editIngredientType: '',
      editIngredientVolume: '',
      editIngredientUnit: '',
      editingIngredient: false,

      ingredientUpdate: null,

      steps: [],

      durationType: -1,
      durationTypes: ['No duration', 'Independent', 'Before flameout', 'After flameout'],

      newStepDescription: '',
      newStepIngredients: [
        {
          id: '',
          type: 'Grains',
          name: '',
          amount: '',
          unit: 'kg',
          recipeStepID: -1,
        },
      ],
      newStepDurationType: 'No duration',
      newStepDuration: 0,
      newStepDurationRequired: false,
      newStepDurationDisplayValue: '00:00:00',
      addNewIngredientAvailable: false,
    };

    this.addItemToIngredientList = this.addItemToIngredientList.bind(this);

    this.updateEditIngredientValue = this.updateEditIngredientValue.bind(this);
    this.updateEditIngredientTypeValue = this.updateEditIngredientTypeValue.bind(this);
    this.updateEditIngredientVolume = this.updateEditIngredientVolume.bind(this);
    this.updateEditUnitTypeValue = this.updateEditUnitTypeValue.bind(this);

    this.updateNewIngredientValue = this.updateNewIngredientValue.bind(this);
    this.updateIngredientTypeValue = this.updateIngredientTypeValue.bind(this);
    this.updateNewIngredientVolume = this.updateNewIngredientVolume.bind(this);
    this.updateUnitTypeValue = this.updateUnitTypeValue.bind(this);

    this.deleteIngredient = this.deleteIngredient.bind(this);
    this.editIngredient = this.editIngredient.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.updateIngredient = this.updateIngredient.bind(this);

    this.updateNewStepDescription = this.updateNewStepDescription.bind(this);
    this.updateNewStepIngredientName = this.updateNewStepIngredientName.bind(this);
    this.updateNewStepIngredientAmount = this.updateNewStepIngredientAmount.bind(this);
    this.updateNewStepIngredientUnitTypeValue = this.updateNewStepIngredientUnitTypeValue.bind(this);
    this.updateNewStepIngredientTypeValue = this.updateNewStepIngredientTypeValue.bind(this);
    this.validateNewStepIngredient = this.validateNewStepIngredient.bind(this);
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
          timerDisplayType: 'No duration',
          timerDisplayValue: '',
          recipeID: arrayItem.recipeID,
          inEdit: false,
        };

        if (arrayItem.timer !== null) {
          obj.timerDisplayType = arrayItem.timer.type;

          console.log(obj.timer.type);

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

    this.setState({ steps: stepList });
    this.setState({ hasLoaded: true });
  }

  updateNewStepDescription(event) {
    this.setState({ newStepDescription: event.target.value });
  }

  updateNewStepIngredientName(event) {
    this.setState({ newIngredient: event.target.value });
  }

  updateNewStepIngredientAmount(event) {
    this.setState({ newIngredientAmount: event.target.value });
  }

  updateNewStepIngredientUnitTypeValue(event) {
    this.setState({ newIngredientUnit: event.target.value });
  }

  updateNewStepIngredientTypeValue(event) {
    this.setState({ newIngredientType: event.target.value });
  }

  validateNewStepIngredient(index) {
    this.setState({ addNewIngredientAvailable: this.state.newIngredient !== '' && this.state.newIngredientAmount !== '' });
  }

  changingItem() {
    console.log('Output here - water profile');
  }

  handleChange(e) {
    console.log('Changed drop down list, new value');
  }

  addItemToIngredientList(event) {
    var tempIngredientList = this.state.newStepIngredients;
    const newIngredient = {
      id: this.state.newIngredientID,
      type: this.state.newIngredientType,
      name: this.state.newIngredient,
      amount: this.state.newIngredientAmount,
      unit: this.state.newIngredientUnit,
      recipeStepID: -1,
    };
    tempIngredientList = tempIngredientList.concat(newIngredient);

    var newID = this.state.newIngredientID - 1;

    this.setState({ newStepIngredients: tempIngredientList });
    this.setState({ newIngredient: '' });
    this.setState({ newIngredientType: 'Grains' });
    this.setState({ newIngredientVolume: '0' });
    this.setState({ newIngredientUnit: 'kg' });
    this.setState({ newIngredientID: newID });

    // var ingEvent = event;
    // ingEvent.target.name = 'AddIngredient';
    // ingEvent.target.value = newIngredient;
    // this.props.handleChange(ingEvent);
  }

  updateEditIngredientValue(event) {
    this.setState({ editIngredient: event.target.value });
  }

  updateEditIngredientTypeValue(event) {
    this.setState({ editIngredientType: event.target.value });
  }

  updateEditIngredientVolume(event) {
    this.setState({ editIngredientVolume: event.target.value });
  }

  updateEditUnitTypeValue(event) {
    this.setState({ editIngredientUnit: event.target.value });
  }

  updateNewIngredientValue(event) {
    this.setState({ newIngredient: event.target.value });
  }

  updateIngredientTypeValue(event) {
    this.setState({ newIngredientType: event.target.value });
  }

  updateNewIngredientVolume(event) {
    this.setState({ newIngredientVolume: event.target.value });
  }

  updateUnitTypeValue(event) {
    this.setState({ newIngredientUnit: event.target.value });
  }

  deleteIngredient = (ingredientID) => (event) => {
    event.preventDefault();

    var array = [...this.state.ingredients];
    var ingredientIndex = array.findIndex((e) => e.id === ingredientID);

    if (ingredientIndex !== -1) {
      array.splice(ingredientIndex, 1);
      this.setState({ ingredients: array });
    }

    this.props.onDeleteIngredient(ingredientID)(event);

    document.getElementById('nextButton').focus();
  };

  editIngredient = (ingredientID) => (event) => {
    var array = [...this.state.ingredients];
    var ingredientIndex = array.findIndex((e) => e.id === ingredientID);

    if (ingredientIndex !== -1) {
      let editIngredient = { ...array[ingredientIndex], inEdit: true };
      array[ingredientIndex] = editIngredient;

      this.setState({ editIngredient: editIngredient.name });
      this.setState({ editIngredientType: editIngredient.type });
      this.setState({ editIngredientVolume: editIngredient.amount });
      this.setState({ editIngredientUnit: editIngredient.unit });

      this.setState({ ingredients: array });
      this.setState({ editingIngredient: true });
    }
  };

  cancelEdit = (ingredientID) => (event) => {
    var array = [...this.state.ingredients];
    var ingredientIndex = array.findIndex((e) => e.id === ingredientID);

    if (ingredientIndex !== -1) {
      let editIngredient = { ...array[ingredientIndex], inEdit: false };
      array[ingredientIndex] = editIngredient;
      this.setState({ ingredients: array });
      this.setState({ editingIngredient: false });
    }
  };

  updateIngredient = (ingredientID) => (event) => {
    var array = [...this.state.ingredients];
    var ingredientIndex = array.findIndex((e) => e.id === ingredientID);

    if (ingredientIndex !== -1) {
      let editIngredient = {
        ...array[ingredientIndex],
        inEdit: false,
        name: this.state.editIngredient,
        type: this.state.editIngredientType,
        amount: this.state.editIngredientVolume,
        unit: this.state.editIngredientUnit,
      };
      array[ingredientIndex] = editIngredient;
      this.setState({ ingredients: array });
      this.setState({ editingIngredient: false });

      var ingEvent = event;
      ingEvent.target.name = 'UpdateIngredient';
      ingEvent.target.value = editIngredient;
      this.props.handleChange(ingEvent);
    }
  };

  calculateDurationFromSeconds;

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
              <div className="edit-page-recipe-title-container">Brewing steps</div>
              <div style={{ marginTop: 15, marginLeft: 10, maxHeight: 300, overflowY: 'auto', overflowX: 'hidden', marginBottom: 5 }}>
                {this.state.steps.map((step, index) => (
                  <div>
                    {step.inEdit === false ? (
                      <div>
                        <div className="step-edit-readonly-container">
                          <div className="step-edit-readonly-index">{index + 1}.</div>
                          <div className="step-edit-readonly-description">
                            <CssTextField
                              fullWidth
                              InputProps={{ disableUnderline: true }}
                              id={step.id}
                              key={step.id}
                              multiline
                              value={step.description}
                              // onFocus={this.editIngredient(step.id)}
                            />
                          </div>
                          <div className="step-edit-readonly-duration">
                            {step.timer !== null ? (
                              <div className="step-edit-readonly-duration-container">
                                <div className="step-edit-readonly-duration-value">{step.timerDisplayValue}</div>
                                {step.timer.type !== 'Independent' ? (
                                  <div className="step-edit-readonly-duration-icon">
                                    {step.timer.type === 'Before flameout' ? (
                                      <DurationIcon name="beforeFlameout" fill="darkgrey" width={16} height={16} />
                                    ) : (
                                      <DurationIcon name="afterFlameout" fill="darkgrey" width={16} height={16} />
                                    )}
                                  </div>
                                ) : null}
                              </div>
                            ) : null}
                          </div>
                          <div className="step-edit-readonly-ingredients">
                            {step.ingredients.map((ingredient) => (
                              <div style={{ marginLeft: '30px' }}>
                                {ingredient.amount}
                                {ingredient.unit} - {ingredient.name}
                              </div>
                            ))}
                          </div>
                          <div className="step-edit-readonly-delete">
                            {/* onClick={this.deleteIngredient(step.id)}> */}
                            <CSSIconButton arial-label="delete">
                              <DeleteIcon fontSize="small" />
                            </CSSIconButton>
                          </div>
                        </div>
                        <ColoredLine color="lightgray" />
                      </div>
                    ) : (
                      <div>
                        <div className="step-edit-container">
                          <div className="step-edit-index">{index + 1}.</div>
                          <div className="step-edit-description">
                            <CssTextField
                              fullWidth
                              InputProps={{ disableUnderline: true }}
                              id={step.id}
                              key={step.id}
                              multiline
                              value={step.description}
                              // onFocus={this.editIngredient(step.id)}
                            />
                            <div className="step-edit-ingredients">
                              {step.ingredients.map((ingredient) => (
                                <div className="step-edit-ingredients-container">
                                  <div className="step-edit-ingredients-name-readonly">
                                    <div style={{ marginLeft: '30px' }}>
                                      {ingredient.amount}
                                      {ingredient.unit} - {ingredient.name}
                                    </div>
                                  </div>
                                  <div className="step-edit-ingredients-delete">
                                    {/* onClick={this.deleteIngredient(step.id)}> */}
                                    <CSSIconButton arial-label="delete">
                                      <DeleteIcon fontSize="small" />
                                    </CSSIconButton>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="step-edit-duration-container">
                            <CssTextField
                              className="step-edit-duration-type"
                              fullWidth="false"
                              InputProps={{ disableUnderline: true }}
                              labelId={'durationType' + step.id}
                              id={'durationType' + step.id}
                              select
                              value={step.timerDisplayType}
                              //   onChange={this.updateEditUnitTypeValue}
                            >
                              {this.state.durationTypes.map((dt, i) => (
                                <MenuItem value={dt} key={i}>
                                  <div>
                                    <div>{dt}</div>
                                  </div>
                                </MenuItem>
                              ))}
                            </CssTextField>
                            {step.timer !== null ? (
                              <CssTextFieldRightAligned
                                className="grid-edit-duration-value"
                                fullWidth="false"
                                InputProps={{ disableUnderline: true }}
                                id={'Duration' + step.id}
                                key={'Duration' + step.id}
                                placeholder="HH:MM:SS"
                                value={step.timerDisplayValue}
                                // onFocus={this.editIngredient(step.id)}
                              />
                            ) : null}
                          </div>
                        </div>
                        <ColoredLine color="lightgray" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {this.state.editingIngredient === false ? (
              <div className="step-new-container">
                <label className="step-new-container-header">New step</label>
                <div className="step-new-description">
                  <CssTextField
                    autoComplete="off"
                    InputProps={{ disableUnderline: true }}
                    id="Ingredient"
                    placeholder="Description"
                    value={this.state.newStepDescription}
                    onChange={this.updateNewStepDescription}
                  />
                </div>
                <div className="step-new-ingredients">
                  <div className="step-new-ingredient-container">
                    {this.state.newStepIngredients.map((ingredient, index) => (
                      <div className="step-new-ingredient-values">
                        <CssTextField
                          autoComplete="off"
                          className="step-new-ingredient-value-name"
                          InputProps={{ disableUnderline: true }}
                          id={'NewIngredientName' + index}
                          placeholder="Ingredient name"
                          value={this.state.newIngredient}
                          onChange={(e) => {
                            this.setState({ newIngredient: e.target.value });
                            this.validateNewStepIngredient();
                          }}
                        />
                        <CssTextField
                          autoComplete="off"
                          className="step-new-ingredient-value-amount"
                          InputProps={{ disableUnderline: true }}
                          id={'NewIngredientAmount' + index}
                          placeholder="Amount"
                          value={this.state.newIngredientAmount}
                          onChange={(e) => {
                            if (e.target.value === '' || /^\d*\.?\d*$/.test(e.target.value)) {
                              this.setState({ newIngredientAmount: e.target.value });
                            } else {
                              return false;
                            }
                            this.validateNewStepIngredient();
                          }}
                        />
                        <CssTextField
                          className="step-new-ingredient-value-unit"
                          id={'NewIngredientUnit' + index}
                          InputProps={{ disableUnderline: true }}
                          labelId={'NewIngredientUnitLabel' + index}
                          select
                          value={this.state.newIngredientUnit}
                          onChange={this.updateNewStepIngredientUnitTypeValue}
                        >
                          {this.props.unitTypes.map((ut, i) => (
                            <MenuItem value={ut} key={i}>
                              <div>
                                <div>{ut}</div>
                              </div>
                            </MenuItem>
                          ))}
                        </CssTextField>
                        <CssTextField
                          className="step-new-ingredient-value-type"
                          id={'NewIngredientType' + index}
                          InputProps={{ disableUnderline: true }}
                          labelId={'NewIngredientTypeLabel' + index}
                          select
                          value={this.state.newIngredientType}
                          onChange={this.updateNewStepIngredientTypeValue}
                        >
                          {this.props.ingredientTypes.map((it, i) => (
                            <MenuItem value={it} key={i}>
                              <div>
                                <div>{it}</div>
                              </div>
                            </MenuItem>
                          ))}
                        </CssTextField>
                        <div className="step-new-ingredient-value-delete">
                          <CSSIconButton arial-label="delete">
                            <DeleteIcon fontSize="small" />
                          </CSSIconButton>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="step-new-ingredient-button">
                    <CssButton disabled={!this.state.addNewIngredientAvailable} onClick={this.addItemToIngredientList} variant="outlined">
                      Add ingredient
                    </CssButton>
                  </div>
                </div>
                <div className="step-new-duration">
                  <CssTextField
                    className="step-new-duration-type"
                    fullWidth="false"
                    InputProps={{ disableUnderline: true }}
                    labelId={'NewDurationType'}
                    id={'NewDurationType'}
                    select
                    value={this.state.newStepDurationType}
                    onChange={(e) => {
                      this.setState({ newStepDurationType: e.target.value });
                      this.setState({ newStepDurationRequired: e.target.value !== 'No duration' });
                    }}
                  >
                    {this.state.durationTypes.map((dt, i) => (
                      <MenuItem value={dt} key={i}>
                        <div>
                          <div>{dt}</div>
                        </div>
                      </MenuItem>
                    ))}
                  </CssTextField>
                  {this.state.newStepDurationRequired ? (
                    <CssTextFieldRightAligned
                      className="step-new-duration-value"
                      fullWidth="false"
                      InputProps={{ disableUnderline: true }}
                      id={'NewDuration'}
                      key={'NewDuration'}
                      placeholder="HH:MM:SS"
                      value={this.state.newStepDurationDisplayValue}
                    />
                  ) : null}
                </div>
                <div className="step-new-commands">
                  <Button className="inline-edit-button" onClick={this.addItemToIngredientList}>
                    Add
                  </Button>
                </div>
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

export default RecipeEdit_Step2a;
