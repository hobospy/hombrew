import React, { Component } from 'react';
import FloatingLabelInput from 'react-floating-label-input';

class RecipeEdit_Step2 extends Component {
  render() {
    if (this.props.currentStep !== 2) {
      return null;
    }

    return (
      <div>
        <div className="edit-page-container-item">
          <FloatingLabelInput id="name" label="Ingredients" onChange={this.props.handleChange} value={this.props.name} />
        </div>
        <div className="edit-page-container-item">
          <FloatingLabelInput id="name" label="Water profile" onChange={this.props.handleChange} value={this.props.name} />
        </div>
      </div>
    );
  }
}

export default RecipeEdit_Step2;
