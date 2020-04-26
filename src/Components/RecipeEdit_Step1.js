import React, { Component } from 'react';
import EditNavigation from './EditNavigation';
import FloatingLabelInput from 'react-floating-label-input';

class RecipeEdit_Step1 extends Component {
  render() {
    if (this.props.currentStep !== 1) {
      return null;
    }

    let rawBeerTypes = ['beertype1', 'beertype2', 'beertype3'];

    return (
      <div className="edit-page-container">
        <div className="edit-page-container-item">
        <FloatingLabelInput id="name" label="Name" onChange={this.props.handleChange} value={this.props.name} />
        </div>
        <div className="edit-page-container-item">
        <FloatingLabelInput id="description" label="Description" onChange={this.props.handleChange} value={this.props.description} />
        </div>
        <div className="edit-page-container-item">
        <FloatingLabelInput id="abv" label="Expected ABV" onChange={this.props.handleChange} value={String(this.props.abv)} />
        </div>
        {/* <label>Type</label> */}
        {/* <input id="beerType" list="beerTypes" />
        <datalist id="beerTypes">
          {rawBeerTypes.map(function (beerType) {
            <option value={beerType}></option>;
          })}
        </datalist> */}
      </div>
    );
  }
}

export default RecipeEdit_Step1;
