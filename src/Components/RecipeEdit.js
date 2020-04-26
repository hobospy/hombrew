import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import RecipeEdit_Step1 from './RecipeEdit_Step1';
import RecipeEdit_Step2 from './RecipeEdit_Step2';
import RecipeEdit_Step3 from './RecipeEdit_Step3';

class RecipeEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 1,
      name: '', //this.props.recipe.name,
      description: '', //this.props.recipe.description,
      abv: 5.0,
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

    return null;
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

  render() {
    return (
      <React.Fragment>
        <h1>Recipe definition</h1>
        <form onSubmit={this.handleSubmit}>
          <RecipeEdit_Step1 currentStep={this.state.currentStep} handleChange={this.handleChange} name={this.state.name} description={this.state.description} abv={this.state.abv} />
          <RecipeEdit_Step2 currentStep={this.state.currentStep} handleChange={this.handleChange} />
          <RecipeEdit_Step3 currentStep={this.state.currentStep} handleChange={this.handleChange} />
          {this.previousButton}
          {this.nextButton}
          <div>Current step: {this.state.currentStep}</div>
        </form>
      </React.Fragment>
    );
  }
}

export default RecipeEdit;
