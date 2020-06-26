import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const CssTextField = withStyles({
  root: {
    '& .Mui-disabled': {
      color: '#001a33',
    },
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

class BrewDetail_Ingredients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoadedIngredients: false,
      ingredients: this.props.ingredients,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return { ingredients: nextProps.ingredients };
  }

  componentDidMount() {
    this.setState({ hasLoadedWaterProfile: true });
  }

  render() {
    const ingredients = this.state.ingredients;
    console.log(ingredients);

    if (ingredients && ingredients.length > 0) {
      return (
        <div>
          {ingredients.map((i) => (
            <div className="brewed-beer-ingredient-item">
              <CssTextField
                disabled
                id={'ingredient_' + i.id}
                InputProps={{ disableUnderline: true }}
                key={i.id}
                label={i.name}
                value={String(i.amount) + i.unit}
              />
            </div>
          ))}
        </div>
      );
    } else {
      return <div>No ingredients</div>;
    }
  }
}

export default BrewDetail_Ingredients;
