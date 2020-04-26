import React, { Component } from 'react';

class RecipeEdit_Step2 extends Component {
  render() {
    if (this.props.currentStep !== 2) {
      return null;
    }

    return (
      <div>
        <label>Ingredients</label>
        <label>Water profile</label>
      </div>
    );
  }
}

export default RecipeEdit_Step2;
