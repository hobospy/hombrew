import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

import LoadingIndicator from '../SupportComponents/LoadingIndicator';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#001a33',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#001a33',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#001a33',
      },
    },
  },
})(TextField);

class RecipeEdit_Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      waterProfileName: '',
      hasLoaded: false,
      availableTypes: [],
      thisType: '',
    };

    this.updateRecipeTypeValue = this.updateRecipeTypeValue.bind(this);
    this.updateWaterProfileValue = this.updateWaterProfileValue.bind(this);
  }

  componentDidMount() {
    this.setState({ availableTypes: this.props.recipeTypeEnums });

    if (this.props.addingNewRecipe === 'true') {
      this.setState({ waterProfileName: this.props.waterProfiles[0].name });

      var cEvent = new CustomEvent('DefaultType');
      cEvent.recipeTarget = { name: 'waterProfile.name', value: this.props.waterProfiles[0].id };

      this.props.handleChange(cEvent);
    } else {
      this.setState({ waterProfileName: this.props.currentWaterProfile === undefined ? '' : this.props.currentWaterProfile.name });
    }

    if (this.props.addingNewRecipe === 'true') {
      this.setState({ thisType: this.props.recipeTypeEnums !== undefined && this.props.recipeTypeEnums.length > 0 ?
                                this.props.recipeTypeEnums[0].value :
                                ''});

      var addingRecipeEvent = new CustomEvent('DefaultType');
      addingRecipeEvent.recipeTarget = { name: 'recipeType', value: this.state.availableTypes[0] };

      this.props.handleChange(addingRecipeEvent);
    } else {
      if (this.props.recipeTypeEnums !== undefined && this.props.recipeTypeEnums.length > 0) {
        var recipeType = this.props.recipeTypeEnums[0];
        if (this.props.recipeType !== undefined) {
          recipeType = this.props.recipeTypeEnums.find((type) => { return type.description === this.props.recipeType });
        }

        this.setState({thisType: recipeType !== undefined ? recipeType.value : this.props.recipeTypeEnums[0].value})
      }
      else {
        this.setState({thisType: ''});
      }
    }

    this.setState({hasLoaded: true});
  }

  updateRecipeTypeValue(event) {
    this.setState({ thisType: event.target.value });

    this.props.handleChange(event);
  }

  updateWaterProfileValue(event) {
    this.setState({ waterProfileName: event.target.value });

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

      typeList = this.state.availableTypes.map((type) => (
        <MenuItem value={type.value} key={type.value}>
          <div>{type.description}</div>
        </MenuItem>
      ));
    }

    return (
      <div className="edit-page-container">
        <div className="edit-page-recipe-title-container">General information</div>

        {this.state.hasLoaded ? (
          <div>
            <div className="edit-page-container-item">
              <CssTextField
                autoComplete="off"
                fullWidth
                id="name"
                label="Name"
                InputProps={{ disableUnderline: true }}
                name="name"
                onChange={this.props.handleChange}
                value={this.props.name}
              />
            </div>
            <div className="edit-page-container-item">
              <CssTextField
                autoComplete="off"
                fullWidth
                id="description"
                label="Description"
                InputProps={{ disableUnderline: true }}
                name="description"
                multiline
                onChange={this.props.handleChange}
                value={this.props.description}
              />
            </div>
            <div className="edit-page-container-item">
              <CssTextField
                select
                InputProps={{ disableUnderline: true }}
                labelId="type-label"
                label="Type"
                id="type-select"
                name="recipeType"
                style={{ marginBottom: 15, width: '100%' }}
                value={this.state.thisType}
                onChange={this.updateRecipeTypeValue}
              >
                {typeList}
              </CssTextField>
            </div>
            <div className="edit-page-container-item">
              <CssTextField
                autoComplete="off"
                fullWidth
                InputProps={{ disableUnderline: true }}
                id="abv"
                label="Expected ABV"
                name="expectedABV"
                onChange={this.props.handleChange}
                value={String(this.props.expectedABV)}
              />
            </div>
            <div className="edit-page-container-item">
              <CssTextField
                select
                InputProps={{ disableUnderline: true }}
                labelId="wp-label"
                label="Water profile"
                id="wp-select"
                name="waterProfile.name"
                style={{ marginBottom: 15, width: '100%' }}
                value={this.state.waterProfileName}
                onChange={this.updateWaterProfileValue}
              >
                {wpList}
              </CssTextField>
            </div>
          </div>
        ) : (
          <LoadingIndicator />
        )}
      </div>
    );
  }
}

export default RecipeEdit_Step1;
