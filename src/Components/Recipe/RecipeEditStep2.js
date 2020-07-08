import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import LoadingIndicator from '../SupportComponents/LoadingIndicator';

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

const CSSDeleteIcon = withStyles({
  // fontSizeSmall: {
  //   height: '20px',
  //   '&:hover': {
  //     height: '30px',
  //     paddingTop: '5px',
  //     paddingBottom: '5px',
  //   },
  // },
})(DeleteIcon);

class RecipeEdit_Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      ingredients: [],
      hasLoaded: false,
      newIngredient: '',
      newIngredientType: 'Grains',
      newIngredientVolume: '',
      newIngredientUnit: 'kg',
      newIngredientID: -1,
      editIngredient: '',
      editIngredientType: '',
      editIngredientVolume: '',
      editIngredientUnit: '',
      editingIngredient: false,

      ingredientUpdate: null,
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
  }

  componentDidMount() {
    var ingList = [];

    if (this.props.ingredients !== undefined) {
      this.props.ingredients.forEach(function (arrayItem) {
        const obj = {
          id: arrayItem.id,
          name: arrayItem.name,
          type: arrayItem.type,
          amount: arrayItem.amount,
          unit: arrayItem.unit,
          recipeID: arrayItem.recipeID,
          inEdit: false,
        };

        ingList.push(obj);
      });
    }

    this.setState({ ingredients: ingList });
    this.setState({ hasLoaded: true });
  }

  changingItem() {
    console.log('Output here - water profile');
  }

  handleChange(e) {
    console.log('Changed drop down list, new value');
  }

  addItemToIngredientList(event) {
    const newIngredient = {
      id: this.state.newIngredientID,
      type: this.state.newIngredientType,
      name: this.state.newIngredient,
      amount: this.state.newIngredientVolume,
      unit: this.state.newIngredientUnit,
      recipeID: this.props.recipeID,
      inEdit: false,
    };

    this.setState({ ingredients: this.state.ingredients.concat(newIngredient) });
    this.setState({ newIngredient: '' });
    this.setState({ newIngredientType: 'Grains' });
    this.setState({ newIngredientVolume: '0' });
    this.setState({ newIngredientUnit: 'kg' });
    this.setState({ newIngredientID: this.state.newIngredientID - 1 });

    var ingEvent = event;
    ingEvent.target.name = 'AddIngredient';
    ingEvent.target.value = newIngredient;
    this.props.handleChange(ingEvent);
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

  render() {
    if (this.props.currentStep !== 2) {
      return null;
    }

    return (
      <div>
        {this.state.hasLoaded ? (
          <div>
            <div className="edit-page-container-item, useStyles.root">
              <div className="edit-page-recipe-title-container">Ingredients</div>
              <div style={{ marginTop: 15, marginLeft: 10 }}>
                {this.state.ingredients.map((i) => (
                  <div>
                    {i.inEdit === false ? (
                      <div className="edit-page-recipe-ingredient-container">
                        <div className="edit-page-recipe-ingredient">
                          {/* <FloatingLabelInput id={i.id} key={i.id} label={i.name} onChange={this.changingItem} value={String(i.amount) + i.unit} /> */}
                          <CssTextField
                            fullWidth
                            InputProps={{ disableUnderline: true }}
                            id={i.id}
                            key={i.id}
                            value={i.amount.toString() + i.unit + ' ' + i.name}
                            onFocus={this.editIngredient(i.id)}
                          />
                        </div>
                        {/* <div className="ingredient-cancel-button-background" onClick={this.deleteIngredient(i.id)}> */}
                        <div className="ingredient-cancel-test" onClick={this.deleteIngredient(i.id)}>
                          <IconButton arial-label="delete">
                            <CSSDeleteIcon fontSize="small" />
                          </IconButton>
                        </div>
                      </div>
                    ) : (
                      <div className="edit-ingredient-container">
                        <div className="inline-edit-recipe-container">
                          <div className="inline-edit-recipe-name">
                            <CssTextField
                              autoComplete="off"
                              InputProps={{ disableUnderline: true }}
                              id="editIngredient"
                              label="Ingredient"
                              value={this.state.editIngredient}
                              onChange={this.updateEditIngredientValue}
                            />
                          </div>
                          <div className="inline-edit-recipe-amount">
                            <CssTextField
                              autoComplete="off"
                              InputProps={{ disableUnderline: true }}
                              id="editVolume"
                              label="Volume"
                              value={this.state.editIngredientVolume.toString()}
                              onChange={this.updateEditIngredientVolume}
                            />
                          </div>
                          <div className="inline-edit-recipe-unit">
                            <CssTextField
                              InputProps={{ disableUnderline: true }}
                              labelId="edit-ut-label"
                              id="ut-select"
                              label="Unit"
                              select
                              value={this.state.editIngredientUnit}
                              onChange={this.updateEditUnitTypeValue}
                            >
                              {this.props.unitTypes.map((ut, i) => (
                                <MenuItem value={ut} key={i}>
                                  <div>
                                    <div>{ut}</div>
                                  </div>
                                </MenuItem>
                              ))}
                            </CssTextField>
                          </div>
                        </div>
                        <div className="inline-edit-recipe-type">
                          <CssTextField
                            InputProps={{ disableUnderline: true }}
                            labelId="it-label"
                            id="edit-it-select"
                            label="Type"
                            select
                            value={this.state.editIngredientType}
                            onChange={this.updateEditIngredientTypeValue}
                          >
                            {this.props.ingredientTypes.map((it, i) => (
                              <MenuItem value={it} key={i}>
                                <div>
                                  <div>{it}</div>
                                </div>
                              </MenuItem>
                            ))}
                          </CssTextField>
                        </div>
                        <div className="inline-edit-button-container">
                          <Button className="inline-edit-button" onClick={this.updateIngredient(i.id)}>
                            Update
                          </Button>
                          <Button className="inline-edit-button" onClick={this.cancelEdit(i.id)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {this.state.editingIngredient === false ? (
              <div className="test-group-container">
                <label className="test-group-container-header">New</label>
                <div className="new-ingredient-container">
                  <div className="inline-edit-recipe-container">
                    <div className="inline-edit-recipe-name">
                      <CssTextField
                        autoComplete="off"
                        InputProps={{ disableUnderline: true }}
                        id="Ingredient"
                        label="Ingredient"
                        value={this.state.newIngredient}
                        onChange={this.updateNewIngredientValue}
                      />
                    </div>
                    <div className="inline-edit-recipe-amount">
                      <CssTextField
                        autoComplete="off"
                        InputProps={{ disableUnderline: true }}
                        id="Volume"
                        label="Volume"
                        value={this.state.newIngredientVolume.toString()}
                        onChange={this.updateNewIngredientVolume}
                      />
                    </div>
                    <div className="inline-edit-recipe-unit">
                      <CssTextField
                        InputProps={{ disableUnderline: true }}
                        select
                        labelId="edit-ut-label"
                        label="Unit"
                        id="ut-select"
                        value={this.state.newIngredientUnit}
                        onChange={this.updateUnitTypeValue}
                      >
                        {this.props.unitTypes.map((ut, i) => (
                          <MenuItem value={ut} key={i}>
                            <div>
                              <div>{ut}</div>
                            </div>
                          </MenuItem>
                        ))}
                      </CssTextField>
                    </div>
                  </div>
                  <div className="inline-edit-recipe-type">
                    <CssTextField
                      InputProps={{ disableUnderline: true }}
                      select
                      labelId="it-label"
                      label="Type"
                      id="edit-it-select"
                      value={this.state.newIngredientType}
                      onChange={this.updateIngredientTypeValue}
                    >
                      {this.props.ingredientTypes.map((it, i) => (
                        <MenuItem value={it} key={i}>
                          <div>
                            <div>{it}</div>
                          </div>
                        </MenuItem>
                      ))}
                    </CssTextField>
                  </div>
                  <div className="inline-edit-button-container">
                    <Button className="inline-edit-button" onClick={this.addItemToIngredientList}>
                      Add
                    </Button>
                  </div>
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

export default RecipeEdit_Step2;
