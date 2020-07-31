import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
      detailsExpanded: this.props.detailsExpanded,
      hideBrewingSteps: this.props.hideBrewingSteps,
    };
  }

  componentDidMount() {
    this.setState({ hasLoadedRecipe: true });
  }

  componentWillReceiveProps(newProps) {
    this.setState({ recipe: newProps.recipe });
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
                leftChild={<BrewDetailIngredients ingredients={recipe.ingredients} />}
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
                    <div>
                      {recipe.steps.length === 0 || recipe.steps === undefined ? (
                        <div>No steps defined</div>
                      ) : (
                        <div>
                          {recipe.steps.map((s, i) => (
                            <div className="recipe-grid-container">
                              <div className="recipe-grid-container-step">{'Step ' + (i + 1)}</div>
                              <div className="recipe-grid-container-description">{s.description}</div>
                              <div className="recipe-grid-container-timer">
                                {s.timer}
                                {s.timer === 1 ? ' min' : ' mins'}
                              </div>
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
