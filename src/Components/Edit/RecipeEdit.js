import React, { Component } from 'react';
import axios from 'axios';
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
      recipeDetail: this.props.recipe,
      recipeDetailName: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

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

  get submitButton() {
    let currentStep = this.state.currentStep;

    if (currentStep === 3) {
      return (
        // <Button variant="outlined" onClick={this.props.onSubmit}>
        <Button variant="outlined" onClick={this.handleSubmit}>
          Submit
        </Button>
      );
    }

    return null;
  }

  handleChange(event) {
    event.preventDefault();

    const { name, value } = event.target;

    console.log(name + ' - ' + value);

    this.setState((prevState) => ({
      recipeDetail: {
        ...prevState.recipeDetail,
        [name]: value,
      },
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();

    console.log('Handling recipe edit submit');
    console.log(this.state.recipeDetail);
    console.log(this.props.baseUrl);

    var myHeaders = new Headers();
    myHeaders.append('Accept', 'applicaiton/json');
    myHeaders.append('Content-Type', 'application/json-patch+json');

    // var data = [
    //   {
    //     Name: this.state.recipeDetail.name,
    //     Type: this.state.recipeDetail.Type,
    //     Description: this.state.recipeDetail.Description,
    //   },
    // ];
    // var raw = JSON.stringify(data);
    var rawObject = {
      Name: this.state.recipeDetail.name,
      Type: this.state.recipeDetail.type,
      Description: this.state.recipeDetail.description,
      WaterProfileID: this.state.recipeDetail.waterProfile.id,
      Ingredients: this.state.recipeDetail.ingredients,
    };

    console.log('Raw object:');
    console.log(rawObject);

    var raw = JSON.stringify(rawObject);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    console.log('Raw data:');
    console.log(raw);

    console.log('Request options:');
    console.log(requestOptions);

    var postURL = this.props.baseUrl + 'recipe/' + this.props.recipe.id;
    console.log('Request URL');
    console.log(postURL);

    fetch(postURL, requestOptions);

    // fetch(this.props.baseUrl, requestOptions)
    //   .then((response) => response.json())
    //   .then((response) => {
    //     this.setState({
    //       recipeDetail: response,
    //     });
    //   });

    // this.props.handleSubmit;
    // const { name, description, abv } = this.state;
    // alert(`Form details:\n
    // Name: ${name}\n
    // Description: ${description}\n
    // ABV: ${abv}`);
  };

  componentDidMount() {
    this.setState({ hasLoaded: true });
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <RecipeEdit_Step1
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            name={this.state.recipeDetail.name}
            description={this.state.recipeDetail.description}
            waterProfiles={this.props.waterProfiles}
            currentWaterProfile={this.state.recipeDetail.waterProfile}
            abv={this.state.recipeDetail.abv}
          />
          <RecipeEdit_Step2
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            ingredients={this.state.recipeDetail.ingredients}
            ingredientTypes={this.props.ingredientTypes}
            unitTypes={this.props.unitTypes}
          />
          <RecipeEdit_Step3 currentStep={this.state.currentStep} handleChange={this.handleChange} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {this.previousButton}
            {this.nextButton}
            {this.submitButton}
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
