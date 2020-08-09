import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
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

class RecipeNewStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Description: '',
      Ingredients: [],
    };
  }

  render() {
    return (
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
    );
  }
}

export default RecipeNewStep;
