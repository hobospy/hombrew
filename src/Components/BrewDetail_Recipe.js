import React, { Component } from 'react';
import FloatingLabelInput, { action } from 'react-floating-label-input';
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
              <CollapsiblePanel title="Brewing steps" children={'Supposed to be brewing steps in here'} open={true} />
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
