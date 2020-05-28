import React, { Component } from 'react';
import EditNavigation from '../EditNavigation';
import FloatingLabelInput from 'react-floating-label-input';
import { Select, Zoom } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class RecipeEdit_Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      hasLoaded: false,
      availableTypes: [
        'Light lager',
        'Pilsner',
        'European amber lager',
        'Dark lager',
        'Bock',
        'Light hybrid beer',
        'Amber hybrid beer',
        'English pale ale',
        'Scottish and Irish ale',
        'American ale',
        'English brown ale',
        'Porter',
        'Stout',
        'India pale ale (IPA)',
        'German wheat and rye beer',
        'Belgian and French ale',
        'Sour ale',
        'Belgian strong ale',
        'Strong ale',
        'Fruit beer',
        'Spice/herb/vegetable beer',
        'Smoke flavoured and wood-aged beer',
        'Speciality beer',
        'Kolsch and altbier',
      ],
      thisType: '',
    };

    this.updateRecipeTypeValue = this.updateRecipeTypeValue.bind(this);
    this.updateWaterProfileValue = this.updateWaterProfileValue.bind(this);
  }

  componentDidMount() {
    this.setState({ hasLoaded: true });
    this.setState({ name: this.props.currentWaterProfile.name });
    this.setState({ thisType: this.props.recipeType });
  }

  updateRecipeTypeValue(event) {
    this.setState({ thisType: event.target.value });

    this.props.handleChange(event);
  }

  updateWaterProfileValue(event) {
    this.setState({ name: event.target.value });

    var newEvent = event;

    var result = this.props.waterProfiles.filter((obj) => {
      return obj.name === event.target.value;
    });

    newEvent.target.value = result[0].id;

    this.props.handleChange(newEvent);
  }

  render() {
    if (this.props.currentStep !== 1) {
      return null;
    }

    let rawBeerTypes = ['beertype1', 'beertype2', 'beertype3'];

    let wpList;
    let typeList;

    if (this.state.hasLoaded === true) {
      wpList = this.props.waterProfiles.map((wp) => (
        <MenuItem value={wp.name} key={wp.id}>
          <div>
            <div>{wp.name}</div>
            <div style={{ fontSize: 12 }}>{wp.description}</div>
          </div>
        </MenuItem>
      ));

      typeList = this.state.availableTypes.map((type, id) => (
        <MenuItem value={type} key={id}>
          <div>{type}</div>
        </MenuItem>
      ));
    }

    return (
      <div className="edit-page-container">
        {this.state.hasLoaded ? (
          <div>
            <div className="edit-page-container-item">
              <FloatingLabelInput id="name" label="Name" name="name" onChange={this.props.handleChange} value={this.props.name} />
            </div>
            <div className="edit-page-container-item">
              <FloatingLabelInput
                id="description"
                label="Description"
                name="description"
                onChange={this.props.handleChange}
                value={this.props.description}
              />
            </div>
            <div className="edit-page-container-item">
              <FloatingLabelInput id="type" label="Type" />
              <Select
                labelId="type-label"
                id="type-select"
                name="recipeType"
                style={{ marginLeft: 10, marginBottom: 15, width: '97%' }}
                //value={this.props.currentWaterProfile.name}
                value={this.state.thisType}
                onChange={this.updateRecipeTypeValue}
                //onChange={this.props.handleChange}
              >
                {typeList}
                {/* {this.props.waterProfiles.map((wp) => {
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
                })} */}
              </Select>
            </div>
            <div className="edit-page-container-item">
              <FloatingLabelInput
                id="abv"
                label="Expected ABV"
                name="abv"
                onChange={this.props.handleChange}
                value={String(this.props.expectedABV)}
              />
            </div>
            <div className="edit-page-container-item">
              {/* <InputLabel id="wp-label">Water profile</InputLabel> */}
              <FloatingLabelInput id="profile" label="Water profile" />
              <Select
                labelId="wp-label"
                id="wp-select"
                name="waterProfile.name"
                style={{ marginLeft: 10, marginBottom: 15, width: '97%' }}
                //value={this.props.currentWaterProfile.name}
                value={this.state.name}
                onChange={this.updateWaterProfileValue}
                //onChange={this.props.handleChange}
              >
                {wpList}
                {/* {this.props.waterProfiles.map((wp) => {
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
                })} */}
              </Select>
            </div>
          </div>
        ) : (
          <div>Still loading</div>
        )}
        {/* <label>Type</label> */}
        {/* <input id="beerType" list="beerTypes" />
        <datalist id="beerTypes">
          {rawBeerTypes.map(function (beerType) {
            <option value={beerType}></option>;
          })}
        </datalist> */}
      </div>
    );
  }
}

export default RecipeEdit_Step1;
