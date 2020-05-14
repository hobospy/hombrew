import React, { Component } from 'react';
import FloatingLabelInput from 'react-floating-label-input';
import InputLabel from '@material-ui/core/InputLabel';
import { Select, Zoom } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';

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

    this.updateWaterProfileValue = this.updateWaterProfileValue.bind(this);
  }

  componentDidMount() {
    this.setState({ name: this.props.currentWaterProfile.name });
  }

  changingItem() {
    console.log('Output here - water profile');
  }

  handleChange(e) {
    console.log('Changed drop down list, new value');
    // : ' + e.target.value);
  }

  updateWaterProfileValue(event) {
    this.setState({ name: event.target.value });
  }

  render() {
    if (this.props.currentStep !== 2) {
      return null;
    }

    let content;

    content = this.props.ingredients.map((i) => (
      // <div className="brewed-beer-water-profile-item">
      <FloatingLabelInput id={i.id} key={i.id} label={i.name} onChange={this.changingItem} value={String(i.amount) + i.unit} />
      // </div>
    ));

    let wpList;

    wpList = this.props.waterProfiles.map((wp) => (
      <ListItem>
        <ListItemText primary={wp.name} secondary={wp.description} />
      </ListItem>
    ));

    console.log('Water profile name: ' + this.props.currentWaterProfile.name);

    //const classes = useStyles();

    return (
      <div>
        <div className="edit-page-container-item, useStyles.root">
          <FloatingLabelInput id="name" label="Ingredients" onChange={this.props.handleChange} value={this.props.name} />
          <div>{content}</div>
        </div>
        <div className="edit-page-container-item, ">
          <InputLabel id="wp-label">Water profile</InputLabel>
          <Select labelId="wp-label" id="wp-select" value={this.state.name} onChange={this.updateWaterProfileValue}>
            {this.props.waterProfiles.map((wp) => {
              return (
                // <WaterProfilesTooltip title={wp.description} placement="right-start" TransitionComponent={Zoom}>
                <MenuItem value={wp.name} key={wp.id}>
                  <div>
                    <div>{wp.name}</div>
                    <div style={{ fontSize: 12 }}>{wp.description}</div>
                  </div>
                </MenuItem>
                // </WaterProfilesTooltip>
              );
            })}
          </Select>
        </div>
      </div>
    );
  }
}

export default RecipeEdit_Step2;
