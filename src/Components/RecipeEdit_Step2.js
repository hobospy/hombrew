import React, { Component } from 'react';
import FloatingLabelInput from 'react-floating-label-input';
import InputLabel from '@material-ui/core/InputLabel';
import { Select, Zoom } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import CancelIcon from '@material-ui/icons/Cancel';

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
    };
  }

  changingItem() {
    console.log('Output here - water profile');
  }

  handleChange(e) {
    console.log('Changed drop down list, new value');
  }

  render() {
    if (this.props.currentStep !== 2) {
      return null;
    }

    let content;

    content = this.props.ingredients.map((i) => (
      <div className="edit-page-recipe-item-container">
        {/* </div><div className="brewed-beer-water-profile-item"> */}
        {/* <FloatingLabelInput id={i.id} key={i.id} label={i.name} onChange={this.changingItem} value={String(i.amount) + i.unit} /> */}
        <CancelIcon className="cancel-button" />
      </div>
    ));

    return (
      <div>
        <div className="edit-page-container-item, useStyles.root">
          <FloatingLabelInput id="name" label="Ingredients" />
          <div style={{ marginTop: 15, marginLeft: 10, marginBottom: 15 }}>{content}</div>
        </div>
      </div>
    );
  }
}

export default RecipeEdit_Step2;
