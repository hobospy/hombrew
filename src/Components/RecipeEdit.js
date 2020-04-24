import React, { Component } from 'react';
import RecipeEdit_Step1 from './RecipeEdit_Step1';

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
        <h1>Recipe definition form</h1>
        <p>Step {this.state.currentStep}</p>

        <form onSubmit={this.handleSubmit}>
          <RecipeEdit_Step1 currentStep={this.state.currentStep} handleChange={this.handleSubmit} name={this.state.name} description={this.state.description} abv={this.state.abv} />
        </form>
      </React.Fragment>
    );
  }
}

export default RecipeEdit;
