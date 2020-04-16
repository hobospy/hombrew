import React, {Component} from 'react';
import FloatingLabelInput, {action} from 'react-floating-label-input';
import CollapsiblePanel from '../Components/CollapsiblePanel';
import DoubleCollapsiblePanel from '../Components/DoubleCollapsiblePanel';
import BrewDetail_WaterProfile from '../Components/BrewDetail_WaterProfile';
import BrewDetail_Ingredients from '../Components/BrewDetail_Ingredients';

class BrewDetail_Recipe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasLoadedRecipe: false,
            recipe: this.props.recipe
        }
    }

    componentDidMount() {
        this.setState({hasLoadedRecipe: true})
    }

    changingItem () {
        console.log("Output here - recipe");
    };

    render() {
        const recipe = this.state.recipe;
        console.log(recipe);

        return (
            <div className="brewed-beer-recipe-column">
                {this.state.hasLoadedRecipe ? (
                    <div className="brewed-beer-recipe">
                <div className="brewed-beer-recipe-description">
                    <div style={{color:"gray", fontSize:"10px"}}>Description</div>
                    <div>{recipe.description}</div>
                    {/* <FloatingLabelInput
                        id="recipe-description"
                        label="Desription"
                        onChange={this.changingItem}
                        value={recipe.description}
                    /> */}
                </div>
                <div className="brewed-beer-recipe-type">
                    <FloatingLabelInput
                        id="recipe-type"
                        label="Type"
                        onChange={this.changingItem}
                        value={recipe.type}
                    />
                </div>
                <div className="brewed-beer-recipe-rating">
                    <FloatingLabelInput
                        id="recipe-rating"
                        label="Rating"
                        onChange={this.changingItem}
                        value={String(recipe.rating)}
                    />
                </div>
                <div className='brewed-beer-recipe-ingredients-water-profile'>
                    <DoubleCollapsiblePanel 
                        leftTitle="Ingredients"
                        leftChild={<BrewDetail_Ingredients ingredients={recipe.ingredients}/>}
                        rightTitle={'Water profile - ' + recipe.waterProfile.name}
                        rightChild={<BrewDetail_WaterProfile waterProfile={recipe.waterProfile}/>}
                        open={false}
                    />
                </div>
                <div className="brewed-beer-recipe-steps">
                    <CollapsiblePanel title="Brewing steps" children={'Supposed to be brewing steps in here'} open={true}/>
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