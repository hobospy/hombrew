import React, { Component } from 'react';
import FloatingLabelInput from 'react-floating-label-input';
import CollapsiblePanel from '../Components/CollapsiblePanel';
import DoubleCollapsiblePanel from '../Components/DoubleCollapsiblePanel';
import BrewDetail_WaterProfile from '../Components/BrewDetail_WaterProfile';
import BrewDetail_Ingredients from '../Components/BrewDetail_Ingredients';

class BrewDetail_Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoadedRecipe: false,
      recipe: this.props.recipe,
      detailsExpanded: this.props.detailsExpanded,
    };
  }

  componentDidMount() {
    this.setState({ hasLoadedRecipe: true });
  }

  componentWillReceiveProps(newProps) {
    this.setState({ recipe: newProps.recipe });
  }

  changingItem() {
    console.log('Output here - recipe');
  }

  render() {
    const recipe = this.state.recipe;
    const detailsExpanded = this.state.detailsExpanded;
    console.log(recipe);
    console.log('Details expanded: ' + detailsExpanded);

    return (
      <div className="brewed-beer-recipe-column">
        {this.state.hasLoadedRecipe ? (
          <div className="brewed-beer-recipe">
            <div className="brewed-beer-recipe-description">
              <div style={{ color: 'gray', fontSize: '10px' }}>Description</div>
              <div>{recipe.description}</div>
            </div>
            <div className="brewed-beer-recipe-type">
              <FloatingLabelInput id="recipe-type" label="Type" onChange={this.changingItem} value={recipe.type} />
            </div>
            <div className="brewed-beer-recipe-expected-abv">
              <FloatingLabelInput id="recipe-expected-abv" label="Expected ABV" value={recipe.expectedABV.toString()} />
            </div>
            <div className="brewed-beer-recipe-ingredients-water-profile">
              <DoubleCollapsiblePanel
                leftTitle="Ingredients"
                leftChild={<BrewDetail_Ingredients ingredients={recipe.ingredients} />}
                rightTitle={'Water profile - ' + recipe.waterProfile.name}
                rightChild={<BrewDetail_WaterProfile waterProfile={recipe.waterProfile} />}
                open={detailsExpanded}
              />
            </div>
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
          </div>
        ) : (
          <div>Still loading</div>
        )}
      </div>
    );
  }
}

export default BrewDetail_Recipe;
