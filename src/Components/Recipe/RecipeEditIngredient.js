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

    constructor(props){
        super(props);
        this.state = {
            editIngredientID: this.props.ingredientID,
            editIngredientName: this.props.ingredient !== null ? this.props.ingredient.name : '',
            editIngredientAmount: this.props.ingredient !== null ? this.props.ingredient.amount : '',
            editIngredientUnit: this.props.ingredient !== null ? this.props.ingredient.unit : '',
            editIngredientType: this.props.ingredient !== null ? this.props.ingredient.type : '',

            updateIngredientAvailable: false,
        };

        this.validatIngredientObject = this.validatIngredientObject.bind(this);
        this.cancelUpdate = this.cancelUpdate.bind(this);
        this.updateIngredient = this.updateIngredient.bind(this);
    }

    validatIngredientObject() {
        this.setState ({ updateIngredientAvailable: this.editIngredientName !== '' && this.editIngredientAmount !== ''});
    }

    cancelUpdate() {
        this.setState({
        editIngredientName: this.props.ingredient !== null ? this.props.ingredient.name : '',
        editIngredientAmount: this.props.ingredient !== null ? this.props.ingredient.amount : '',
        editIngredientUnit: this.props.ingredient !== null ? this.props.ingredient.unit : '',
        editIngredientType: this.props.ingredient !== null ? this.props.ingredient.type : '',});

        this.props.cancel();
    }

    updateIngredient() {
        var updatedIngredientObject = {
            id: this.state.editIngredientID,
            name: this.state.editIngredientName,
            amount: this.state.editIngredientAmount,
            unit: this.state.editIngredientUnit,
            type: this.state.editIngredientType,
        };

        this.props.submit(updatedIngredientObject);
    }

    render () {
        return (
            <div className="edit-ingredient-values">
            <CssTextField
              autoComplete="off"
              className="edit-ingredient-value-name"
              InputProps={{ disableUnderline: true }}
              placeholder="Ingredient name"
              value={this.state.editIngredientName}
              onChange={(e) => {
                this.setState({ editIngredientName: e.target.value });
                this.validatIngredientObject();
              }}
            />
            <CssTextField
              autoComplete="off"
              className="edit-ingredient-value-amount"
              InputProps={{ disableUnderline: true }}
              placeholder="Amount"
              value={this.state.newIngredientAmount}
              onChange={(e) => {
                if (e.target.value === '' || /^\d*\.?\d*$/.test(e.target.value)) {
                  this.setState({ editIngredientAmount: e.target.value });
                } else {
                  return false;
                }
                this.validateIngredientObject();
              }}
            />
            <CssTextField
              className="edit-ingredient-value-unit"
              InputProps={{ disableUnderline: true }}
              select
              value={this.state.editIngredientUnit}
              onChange={(e) => {
                  this.setState({ editIngredientUnit: e.target.value});
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
                  this.setState({ editIngredientType: e.target.value});
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
            <CssButton className="edit-ingredient-value-buttons-submit" disabled={!this.state.updateIngredientAvailable} onClick={this.updateIngredient} variant="outlined">
              {this.props.submitText}
            </CssButton>
          </div>
          </div>
        );
    }
}

export default RecipeEditIngredient;
