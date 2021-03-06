import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

import RecipeEditStep1 from './RecipeEditStep1';
import RecipeEditStep2 from './RecipeEditStep2';

const StyledButton = withStyles({
  outlined: {
    border: '1px solid #b4b4b4',
  },
})(Button);

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

    cStep = cStep >= 1 ? 2 : cStep + 1;

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
        <StyledButton variant="outlined" onClick={this._prev}>
          Previous
        </StyledButton>
      );
    }

    return (
      <StyledButton variant="outlined" onClick={this._prev} style={{ visibility: 'hidden' }}>
        Previous
      </StyledButton>
    );
  }

  get nextButton() {
    let currentStep = this.state.currentStep;

    if (currentStep < 2) {
      return (
        <StyledButton id="nextButton" variant="outlined" onClick={this._next}>
          Next
        </StyledButton>
      );
    }

    return null;
  }

  get submitButton() {
    let currentStep = this.state.currentStep;

    if (currentStep === 2) {
      return (
        <StyledButton id="submitButton" variant="outlined" onClick={this.props.onSubmit}>
          Submit
        </StyledButton>
      );
    }

    return null;
  }

  handleChange(event) {
    event.preventDefault();

    this.props.onChange(event);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append('Accept', 'applicaiton/json');
    myHeaders.append('Content-Type', 'application/json-patch+json');

    var rawObject = {
      Name: this.state.recipeDetail.name,
      Type: this.state.recipeDetail.type,
      Description: this.state.recipeDetail.description,
      WaterProfileID: this.state.recipeDetail.waterProfile.id,
      Ingredients: this.state.recipeDetail.ingredients,
    };

    var raw = JSON.stringify(rawObject);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    var postURL = this.props.baseUrl + 'recipe/' + this.props.recipe.id;

    fetch(postURL, requestOptions);
  };

  componentDidMount() {
    this.setState({ hasLoaded: true });
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <RecipeEditStep1
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            name={this.props.recipe.name}
            description={this.props.recipe.description}
            recipeType={this.props.recipe.type}
            recipeTypeEnums={this.props.recipeTypeEnums}
            expectedABV={this.props.recipe.expectedABV}
            waterProfiles={this.props.waterProfiles}
            currentWaterProfile={this.props.recipe.waterProfile}
            abv={this.props.recipe.abv}
            addingNewRecipe={this.props.addingNewRecipe}
          />
          <RecipeEditStep2
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            onAddStep={this.props.onAddStep}
            onUpdateStep={this.props.onUpdateStep}
            onDeleteStep={this.props.onDeleteStep}
            onDeleteIngredient={this.props.onDeleteIngredient}
            ingredients={this.state.recipeDetail.ingredients}
            steps={this.state.recipeDetail.steps}
            ingredientTypes={this.props.ingredientTypes}
            unitsOfMeasure={this.props.unitsOfMeasure}
            durationTypes={this.props.durationTypes}
            recipeID={this.props.recipe.recipeID}
          />
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
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default RecipeEdit;
