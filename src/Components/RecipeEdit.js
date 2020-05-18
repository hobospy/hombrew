import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

import RecipeEdit_Step1 from './RecipeEdit_Step1';
import RecipeEdit_Step2 from './RecipeEdit_Step2';
import RecipeEdit_Step3 from './RecipeEdit_Step3';

import InputLabel from '@material-ui/core/InputLabel';
import { Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

class RecipeEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 1,
      hasLoaded: false,
    };

    this.handleChange = this.handleChange.bind(this);

    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
  }

  _next() {
    let cStep = this.state.currentStep;

    cStep = cStep >= 2 ? 3 : cStep + 1;

    this.setState({
      currentStep: cStep,
    });
  }

  _prev() {
    let currentStep = this.state.currentStep;

    currentStep = currentStep <= 1 ? 1 : currentStep - 1;

    this.setState({
      currentStep: currentStep,
    });
  }

  get previousButton() {
    let currentStep = this.state.currentStep;

    if (currentStep !== 1) {
      return (
        <Button variant="outlined" onClick={this._prev}>
          Previous
        </Button>
      );
    }

    return (
      <Button variant="outlined" onClick={this._prev} style={{ visibility: 'hidden' }}>
        Previous
      </Button>
    );
  }

  get nextButton() {
    let currentStep = this.state.currentStep;

    if (currentStep < 3) {
      return (
        <Button variant="outlined" onClick={this._next}>
          Next
        </Button>
      );
    }

    return null;
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, description, abv } = this.state;
    alert(`Form details:\n
    Name: ${name}\n
    Description: ${description}\n
    ABV: ${abv}`);
  };

  componentDidMount() {
    this.setState({ hasLoaded: true });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Recipe definition</h1>
        <form onSubmit={this.handleSubmit}>
          <RecipeEdit_Step1
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            name={this.props.recipe.name}
            description={this.props.recipe.description}
            waterProfiles={this.props.waterProfiles}
            currentWaterProfile={this.props.recipe.waterProfile}
            abv={this.props.recipe.abv}
          />
          <RecipeEdit_Step2 currentStep={this.state.currentStep} handleChange={this.handleChange} ingredients={this.props.recipe.ingredients} />
          <RecipeEdit_Step3 currentStep={this.state.currentStep} handleChange={this.handleChange} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {this.previousButton}
            {this.nextButton}
          </div>
          <div className="edit-page-indicator-container">
            <div className="edit-page-indicator-page1">
              <RadioButtonCheckedIcon style={{ display: this.state.currentStep === 1 ? 'inline' : 'none' }} />
              <RadioButtonUncheckedIcon style={{ display: this.state.currentStep === 1 ? 'none' : 'inline' }} />
            </div>
            <div className="edit-page-indicator-page2">
              <RadioButtonCheckedIcon style={{ display: this.state.currentStep === 2 ? 'inline' : 'none' }} />
              <RadioButtonUncheckedIcon style={{ display: this.state.currentStep === 2 ? 'none' : 'inline' }} />
            </div>
            <div className="edit-page-indicator-page3">
              <RadioButtonCheckedIcon style={{ display: this.state.currentStep === 3 ? 'inline' : 'none' }} />
              <RadioButtonUncheckedIcon style={{ display: this.state.currentStep === 3 ? 'none' : 'inline' }} />
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default RecipeEdit;
