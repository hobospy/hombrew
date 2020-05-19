import React, { Component } from 'react';
import FloatingLabelInput from 'react-floating-label-input';
import InputLabel from '@material-ui/core/InputLabel';
import { Select, Zoom } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { withStyles, emphasize } from '@material-ui/core/styles';

const WaterProfilesTooltip = withStyles({
  tooltip: {
    color: 'white',
    backgroundColor: '#001a33',
    fontSize: 12,
    border: '1px solid #dadde9',
    marginTop: -10,
    marginLeft: -10,
  },
})(Tooltip);

class RecipeEdit_Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      ingredients: null,
      hasLoaded: false,
    };

    this.addItemToIngredientList = this.addItemToIngredientList.bind(this);
  }

  componentDidMount() {
    this.setState({ingredients: this.props.ingredients});
    this.setState({hasLoaded: true});

    console.log(this.state.ingredients);
  }

  changingItem() {
    console.log('Output here - water profile');
  }

  handleChange(e) {
    console.log('Changed drop down list, new value');
  }

  addItemToIngredientList() {
    const newIngredient = {'id':7007, 'type':"Grains", 'name':"Dark crystal", 'amount':"0.1", unit: "kg"};
    this.setState({ingredients: this.state.ingredients.concat(newIngredient)});
  }

  // addItemToIngredientList = e => {
  //   const {target} = e;
  //   const newIngredient = {'id':7007, 'type':"Grains", 'name':"Dark crystal", 'amount':"0.1", unit: "kg"};
  //   this.setState({ingredients: this.state.ingredients.concat(newIngredient)});
  // }

  render() {
    if (this.props.currentStep !== 2) {
      return null;
    }

    return (
      <div>
      {this.state.hasLoaded ? (
      <div>
        <div className="edit-page-container-item, useStyles.root">
          <FloatingLabelInput id="name" label="Ingredients" />
          <div style={{ marginTop: 15, marginLeft: 10, marginBottom: 15 }}>
            {this.state.ingredients.map((i) => (
              <div className="edit-page-recipe-ingredient-container">
                <div className="edit-page-recipe-ingredient">
                  <FloatingLabelInput id={i.id} key={i.id} label={i.name} onChange={this.changingItem} value={String(i.amount) + i.unit} />
                </div>
                <div className="cancel-button">
                  <CancelIcon />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="edit-page-recipe-ingredient-container">
          <div className="new-ingredient">
            <FloatingLabelInput id="newIngredient" label="New ingredient" onChange={this.changingItem} />
          </div>
          <Button className="add-button" onClick={this.addItemToIngredientList}>Add</Button>
        </div>
      </div>
      ) : (
        <div>Still loading</div>
      )}
      </div>
    );
  }
}

export default RecipeEdit_Step2;
