import React, {Component} from 'react';
import FloatingLabelInput, {action} from 'react-floating-label-input';

class BrewDetail_Ingredients extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasLoadedIngredients: false,
            ingredients: this.props.ingredients
        }
    }

    componentDidMount() {
        this.setState({hasLoadedWaterProfile: true})
    }

    changingItem () {
        console.log("Output here - water profile");
    };

    render () {
        const ingredients = this.state.ingredients;
        console.log(ingredients);
        
        if (ingredients && ingredients.length > 0) {
            return (
                <div>
                {ingredients.map(i =>(
                    <div  className="brewed-beer-ingredient-item">
                        <FloatingLabelInput
                                    key={i.id}
                                    id={'ingredient_' + i.id}
                                    label={i.name}
                                    onChange={this.changingItem}
                                    value={String(i.amount)}
                        />
                    </div>
                ))}
                </div>
            );
        }
        else
        {
            return (
                <div>No ingredients</div>
            );
        }
    }
}

export default BrewDetail_Ingredients;