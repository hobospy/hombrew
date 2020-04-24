import React, { Component } from 'react';

class RecipeEdit_Step1 extends Component {
  render() {
    if (this.props.currentStep !== 1) {
      return null;
    }

    let rawBeerTypes = ['beertype1', 'beertype2', 'beertype3'];

    return (
      <div>
        <label>Name</label>
        <input id="name" type="text" placeholder="Brewing name" value={this.props.name} onChange={this.props.handleChange} />
        <label>Type</label>
        {/* <input id="beerType" list="beerTypes" />
        <datalist id="beerTypes">
          {rawBeerTypes.map(function (beerType) {
            <option value={beerType}></option>;
          })}
        </datalist> */}
        <label>Description</label>
        <input id="description" type="text" placeholder="Recipe description" value={this.props.description} onChange={this.props.handleChange} />
        <label>ABV</label>
        <input id="expectedABV" type="number" placeholder="Expected ABV" value={this.props.abv} onChange={this.props.handleChange} />
      </div>
    );
  }
}

export default RecipeEdit_Step1;
