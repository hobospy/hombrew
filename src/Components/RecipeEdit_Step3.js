import React, { Component } from 'react';

class RecipeEdit_Step3 extends Component {
  render() {
    if (this.props.currentStep !== 3) {
      return null;
    }

    return (
      <div>
        <label>Brewing steps</label>
      </div>
    );
  }
}

export default RecipeEdit_Step3;
