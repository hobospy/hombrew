import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

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
        <div className="edit-page-recipe-title-container">General information</div>

        {this.state.hasLoaded ? (
          <div>
            <div className="edit-page-container-item">
              <CssTextField
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
                value={this.state.name}
                onChange={this.updateWaterProfileValue}
              >
                {wpList}
              </CssTextField>
            </div>
          </div>
        ) : (
          <div>Still loading</div>
        )}
      </div>
    );
  }
}

export default RecipeEdit_Step1;
