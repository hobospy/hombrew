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
    };

    this.updateWaterProfileValue = this.updateWaterProfileValue.bind(this);
  }

  componentDidMount() {
    this.setState({ hasLoaded: true });
    this.setState({ name: this.props.currentWaterProfile.name });
  }

  updateWaterProfileValue(event) {
    this.setState({ name: event.target.value });
  }

  render() {
    if (this.props.currentStep !== 1) {
      return null;
    }

    let rawBeerTypes = ['beertype1', 'beertype2', 'beertype3'];

    let wpList;

    if (this.state.hasLoaded === true) {
      wpList = this.props.waterProfiles.map((wp) => (
        <MenuItem value={wp.name} key={wp.id}>
          <div>
            <div>{wp.name}</div>
            <div style={{ fontSize: 12 }}>{wp.description}</div>
          </div>
        </MenuItem>
      ));
    }

    return (
      <div className="edit-page-container">
        {this.state.hasLoaded ? (
          <div>
            <div className="edit-page-container-item">
              <FloatingLabelInput id="name" label="Name" onChange={this.props.handleChange} value={this.props.name} />
            </div>
            <div className="edit-page-container-item">
              <FloatingLabelInput id="description" label="Description" onChange={this.props.handleChange} value={this.props.description} />
            </div>
            <div className="edit-page-container-item">
              <FloatingLabelInput id="abv" label="Expected ABV" onChange={this.props.handleChange} value={String(this.props.abv)} />
            </div>
            <div className="edit-page-container-item, ">
              {/* <InputLabel id="wp-label">Water profile</InputLabel> */}
              <FloatingLabelInput id="profile" label="Water profile" />
              <Select
                labelId="wp-label"
                id="wp-select"
                style={{ marginLeft: 10, marginBottom: 15, width: '97%' }}
                value={this.state.name}
                onChange={this.updateWaterProfileValue}
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
