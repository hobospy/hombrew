import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

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

class RecipeEditIngredient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultIngredientUnit:
        this.props.ingredient !== null && this.props.ingredient !== undefined
          ? this.props.ingredient.unit
          : this.props.unitTypes !== null &&
            this.props.unitTypes !== undefined &&
            Array.isArray(this.props.unitTypes) &&
            this.props.unitTypes.length > 0
          ? this.props.unitTypes[0]
          : '',
      defaultIngredientType:
        this.props.ingredient !== null && this.props.ingredient !== undefined
          ? this.props.ingredient.type
          : this.props.ingredientTypes !== null &&
            this.props.ingredientTypes !== undefined &&
            Array.isArray(this.props.ingredientTypes) &&
            this.props.ingredientTypes.length > 0
          ? this.props.ingredientTypes[0]
          : '',
      editIngredientAmount: this.props.ingredient !== null && this.props.ingredient !== undefined ? this.props.ingredient.amount : '',
      editIngredientID: this.props.ingredientID,
      editIngredientName: this.props.ingredient !== null && this.props.ingredient !== undefined ? this.props.ingredient.name : '',
      editIngredientType: '',
      editIngredientUnit: '',
      updateIngredientAvailable: false,
    };

    this.validateIngredientObject = this.validateIngredientObject.bind(this);
    this.cancelUpdate = this.cancelUpdate.bind(this);
    this.updateIngredient = this.updateIngredient.bind(this);

    this.clear = this.clear.bind(this);
  }

  componentDidMount() {
    this.setState({ editIngredientType: this.state.defaultIngredientType, editIngredientUnit: this.state.defaultIngredientUnit });
  }

  validateIngredientObject() {
    this.setState({ updateIngredientAvailable: this.state.editIngredientName !== '' && this.state.editIngredientAmount !== '' });
  }

  cancelUpdate() {
    this.clear();

    this.props.cancel();
  }

  updateIngredient() {
    var updatedIngredientObject = {
      id: this.state.editIngredientID,
      name: this.state.editIngredientName,
      amount: this.state.editIngredientAmount,
      unit: this.state.editIngredientUnit,
      type: this.state.editIngredientType,
      recipeStepID: this.props.stepID,
    };

    this.setState({
      editIngredientName: '',
      editIngredientAmount: '',
      editIngredientType: this.state.defaultIngredientType,
      editIngredientUnit: this.state.defaultIngredientUnit,
      updateIngredientAvailable: false,
    });

    this.props.submit(updatedIngredientObject);
  }

  clear = () => {
    this.setState({
      editIngredientName: this.props.ingredient !== null && this.props.ingredient !== undefined ? this.props.ingredient.name : '',
      editIngredientAmount: this.props.ingredient !== null && this.props.ingredient !== undefined ? this.props.ingredient.amount : '',
      editIngredientUnit: this.state.defaultIngredientUnit,
      editIngredientType: this.state.defaultIngredientType,
      updateIngredientAvailable: false,
    });
  };

  render() {
    return (
      <div className="edit-ingredient-values">
        <CssTextField
          autoComplete="off"
          className="edit-ingredient-value-name"
          InputProps={{ disableUnderline: true }}
          placeholder="Ingredient name"
          value={this.state.editIngredientName}
          onChange={(e) => {
            this.setState({ editIngredientName: e.target.value }, this.validateIngredientObject);
          }}
        />
        <CssTextField
          autoComplete="off"
          className="edit-ingredient-value-amount"
          InputProps={{ disableUnderline: true }}
          placeholder="Amount"
          value={this.state.editIngredientAmount}
          onChange={(e) => {
            if (e.target.value === '' || /^\d*\.?\d*$/.test(e.target.value)) {
              this.setState({ editIngredientAmount: e.target.value }, this.validateIngredientObject);
            } else {
              return false;
            }
          }}
        />
        <CssTextField
          className="edit-ingredient-value-unit"
          InputProps={{ disableUnderline: true }}
          select
          value={this.state.editIngredientUnit}
          onChange={(e) => {
            this.setState({ editIngredientUnit: e.target.value });
          }}
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
          className="edit-ingredient-value-type"
          InputProps={{ disableUnderline: true }}
          select
          value={this.state.editIngredientType}
          onChange={(e) => {
            this.setState({ editIngredientType: e.target.value });
          }}
        >
          {this.props.ingredientTypes.map((it, i) => (
            <MenuItem value={it} key={i}>
              <div>
                <div>{it}</div>
              </div>
            </MenuItem>
          ))}
        </CssTextField>
        <div className="edit-ingredient-value-buttons-container">
          <CssButton className="edit-ingredient-value-buttons-cancel" onClick={this.cancelUpdate} variant="outlined">
            Cancel
          </CssButton>
          <CssButton
            className="edit-ingredient-value-buttons-submit"
            disabled={!this.state.updateIngredientAvailable}
            onClick={this.updateIngredient}
            variant="outlined"
          >
            {this.props.submitText}
          </CssButton>
        </div>
      </div>
    );
  }
}

export default RecipeEditIngredient;
