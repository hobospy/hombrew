import React, { Component } from 'react';
import { TextField, MenuList } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import AfterFlameout from '../../resources/AfterFlameout.png';
import BeforeFlameout from '../../resources/BeforeFlameout.png';
import BrewDetailWaterProfile from './BrewDetailWaterProfile';
import BrewDetailIngredients from './BrewDetailIngredients';
import CollapsiblePanel from '../SupportComponents/CollapsiblePanel';
import DoubleCollapsiblePanel from '../SupportComponents/DoubleCollapsiblePanel';
import LoadingIndicator from '../SupportComponents/LoadingIndicator';

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

class BrewDetail_Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoadedRecipe: false,
      recipe: this.props.recipe,
      ingredients: [],
      detailsExpanded: this.props.detailsExpanded,
      hideBrewingSteps: this.props.hideBrewingSteps,
      steps: [],
    };

    this.updateIngredientList = this.updateIngredientList.bind(this);
  }

  componentDidMount() {
    var stepList = [];

    if (this.props.recipe !== undefined && this.props.recipe.steps !== undefined) {
      this.props.recipe.steps.forEach(function (arrayItem) {
        const obj = {
          id: arrayItem.id,
          description: arrayItem.description,
          ingredients: arrayItem.ingredients,
          timer: arrayItem.timer,
          timerDisplayValue: '',
          recipeID: arrayItem.recipeID,
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

    this.updateIngredientList();
    this.setState({ steps: stepList, hasLoadedRecipe: true });
  }

  componentWillReceiveProps(newProps) {
    this.setState({ recipe: newProps.recipe }, this.updateIngredientList);
  }

  updateIngredientList() {
    // Loop through the ingrdietns in the recipe steps and group together
    // Ignore case differences

    if (this.state.recipe !== undefined && this.state.recipe !== null && this.state.recipe.steps !== undefined && this.state.recipe.steps !== null) {
      var sortedIngredients = [];
      this.state.recipe.steps.forEach((step) => {
        if (step.ingredients !== undefined && step.ingredients !== null && step.ingredients.length > 0) {
          step.ingredients.forEach((ingredient) => {
            var multiplier = 1;
            var unit = ingredient.unit;
            if (unit === 'kg' || unit === 'l') {
              multiplier = 1000;
              unit = unit === 'kg' ? 'g' : 'ml';
            }

            var ingIndex = sortedIngredients.findIndex(
              (ing) => ing.name.toLowerCase() === ingredient.name.toLowerCase() && ing.type === ingredient.type && ing.unit === unit
            );

            if (ingIndex === -1) {
              // Ingredient doesn't exist in the array, add it
              sortedIngredients.push({ name: ingredient.name, type: ingredient.type, unit: unit, amount: ingredient.amount * multiplier });
            } else {
              // Ingredient exists in the array, add volume to the existing item checking units match
              var newAmount = sortedIngredients[ingIndex].amount + ingredient.amount;
              sortedIngredients[ingIndex].amount = newAmount;
            }
          });
        }
      });

      sortedIngredients.forEach((ingredient) => {
        if ((ingredient.unit === 'g' || ingredient.unit === 'ml') && ingredient.amount >= 1000) {
          ingredient.amount = ingredient.amount / 1000;
          ingredient.unit = ingredient.unit === 'g' ? 'kg' : 'l';
        }
      });

      this.setState({ ingredients: sortedIngredients });
    }
  }

  render() {
    const recipe = this.state.recipe;
    const detailsExpanded = this.state.detailsExpanded;
    console.log(recipe);
    console.log('Details expanded: ' + detailsExpanded);

    return (
      <div>
        {this.state.hasLoadedRecipe ? (
          <div className="brewed-beer-recipe">
            <div className="brewed-beer-recipe-description">
              <CssTextField
                disabled
                fullWidth
                id="recipe-description"
                InputProps={{ disableUnderline: true }}
                multiline
                label="Description"
                value={recipe.description}
              />
            </div>
            <div className="brewed-beer-recipe-type">
              <CssTextField disabled id="recipe-type" InputProps={{ disableUnderline: true }} label="Type" value={recipe.type} />
            </div>
            <div className="brewed-beer-recipe-expected-abv">
              <CssTextField
                disabled
                id="recipe-expected-abv"
                InputProps={{ disableUnderline: true }}
                label="Expected ABV"
                value={recipe.expectedABV.toString()}
              />
            </div>
            <div className="brewed-beer-recipe-ingredients-water-profile">
              <DoubleCollapsiblePanel
                leftTitle="Ingredients"
                leftChild={<BrewDetailIngredients ingredients={this.state.ingredients} unitTypes={this.props.unitTypes}/>}
                rightTitle="Water profile"
                rightChild={<BrewDetailWaterProfile waterProfile={recipe.waterProfile} />}
                open={detailsExpanded}
              />
            </div>
            {this.state.hideBrewingSteps === null || this.state.hideBrewingSteps === false ? (
              <div className="brewed-beer-recipe-steps">
                <CollapsiblePanel
                  title="Brewing steps"
                  children={
                    <div style={{ marginBottom: '45px' }}>
                      {this.state.steps === null || this.state.steps === undefined || this.state.steps.length === 0 ? (
                        <div>No steps defined</div>
                      ) : (
                        <div>
                          {this.state.steps.map((step, i) => (
                            <div className="recipe-grid-container">
                              <div className="recipe-grid-container-step">{'Step ' + (i + 1)}</div>
                              <div className="recipe-grid-container-description">{step.description}</div>

                              <div className="recipe-grid-container-timer">{step.timerDisplayValue}</div>
                              {step.timer !== null && step.timer.type > 1 ? (
                                <div className="recipe-grid-container-timer-icon">
                                  {step.timer.type === 2 ? <img src={BeforeFlameout} alt="" /> : <img src={AfterFlameout} alt="" />}
                                </div>
                              ) : null}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  }
                  open={true}
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

export default BrewDetail_Recipe;
