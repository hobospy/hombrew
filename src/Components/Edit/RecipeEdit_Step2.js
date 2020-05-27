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
      newIngredient: '',
      newIngredientType: 'Grains',
      newIngredientVolume: '',
      newIngredientUnit: 'kg',
    };

    this.addItemToIngredientList = this.addItemToIngredientList.bind(this);
    this.updateNewIngredientValue = this.updateNewIngredientValue.bind(this);
    this.updateIngredientTypeValue = this.updateIngredientTypeValue.bind(this);
    this.updateNewIngredientVolume = this.updateNewIngredientVolume.bind(this);
    this.updateUnitTypeValue = this.updateUnitTypeValue.bind(this);
  }

  componentDidMount() {
    this.setState({ ingredients: this.props.ingredients });
    this.setState({ hasLoaded: true });

    console.log(this.state.ingredients);
  }

  changingItem() {
    console.log('Output here - water profile');
  }

  handleChange(e) {
    console.log('Changed drop down list, new value');
  }

  addItemToIngredientList(event) {
    const newIngredient = {
      id: -1,
      type: this.state.newIngredientType,
      name: this.state.newIngredient,
      amount: this.state.newIngredientVolume,
      unit: this.state.newIngredientUnit,
    };

    

    this.setState({ ingredients: this.state.ingredients.concat(newIngredient) });
    this.setState({ newIngredient: '' });
    this.setState({ newIngredientType: 'Grains' });
    this.setState({ newIngredientVolume: '0' });
    this.setState({ newIngredientUnit: 'kg' });


    var ingEvent = event;
    ingEvent.target.name = 'AddIngredient';
    ingEvent.target.value = newIngredient;
    this.props.handleChange(ingEvent);
  }

  updateNewIngredientValue(event) {
    this.setState({ newIngredient: event.target.value });
  }

  updateIngredientTypeValue(event) {
    this.setState({ newIngredientType: event.target.value });
  }

  updateNewIngredientVolume(event) {
    this.setState({ newIngredientVolume: event.target.value });
  }

  updateUnitTypeValue(event) {
    this.setState({ newIngredientUnit: event.target.value });
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
            <div className="new-ingredient-container">
              <div className="new-ingredient-title">
                <FloatingLabelInput id="newIngredient" label="New ingredient" />
              </div>
              <div className="new-ingredient-name">
                <FloatingLabelInput id="Ingredient" label="Ingredient" value={this.state.newIngredient} onChange={this.updateNewIngredientValue} />
              </div>
              <div className="new-ingredient-type">
                <Select
                  labelId="it-label"
                  id="it-select"
                  style={{ marginLeft: 10, marginBottom: 15, width: '97%' }}
                  value={this.state.newIngredientType}
                  onChange={this.updateIngredientTypeValue}
                >
                  {this.props.ingredientTypes.map((it, i) => (
                    <MenuItem value={it} key={i}>
                      <div>
                        <div>{it}</div>
                      </div>
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="new-ingredient-volume">
                <FloatingLabelInput id="Volume" label="Volume" value={this.state.newIngredientVolume} onChange={this.updateNewIngredientVolume} />
              </div>
              <div className="new-ingredient-unit">
                <Select
                  labelId="ut-label"
                  id="ut-select"
                  style={{ marginLeft: 10, marginBottom: 15, width: '97%' }}
                  value={this.state.newIngredientUnit}
                  onChange={this.updateUnitTypeValue}
                >
                  {this.props.unitTypes.map((ut, i) => (
                    <MenuItem value={ut} key={i}>
                      <div>
                        <div>{ut}</div>
                      </div>
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="new-ingredient-add">
                <Button className="add-button" onClick={this.addItemToIngredientList}>
                  Add
                </Button>
              </div>
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
