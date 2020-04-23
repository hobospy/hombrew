import React, { Component } from 'react';
import axios from 'axios';
import FloatingLabelInput, { action } from 'react-floating-label-input';
import Favourite from '../SupportFunctions/Favourite';

import BrewDetail_Recipe from './BrewDetail_Recipe';

class RecipeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false,
      recipeDetail: '',
      url: `${this.props.baseUrl}recipe/${this.props.match.params.id}`,
      id: this.props.match.params.id,
    };

    this.updateFavourite = this.updateFavourite.bind(this);
  }

  componentDidMount() {
    console.log(this.state.url);
    axios
      .get(this.state.url)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ recipeDetail: data });
        this.setState({ hasLoaded: true });
      });
  }

  updateFavourite = async (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json-patch+json');

    var data = [
      {
        op: 'replace',
        path: '/Favourite',
        value: !this.state.recipeDetail.Favourite,
      },
    ];
    var raw = JSON.stringify(data);

    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    console.log(raw);
    console.log(requestOptions);

    fetch(this.state.url, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          recipeDetail: response,
        });
      });
  };

  render() {
    const recipe = this.state.recipeDetail;
    console.log(recipe);

    return (
      <div className="recipe-detail">
        {this.state.hasLoaded ? (
          <div>
            <div className="recipe-detail-title-container">
              <div className="recipe-detail-title">
                <FloatingLabelInput id="recipe-name" label="Name" value={recipe.name} />
              </div>
              <div className="recipe-detail-favourite">
                <Favourite favourite={recipe.favourite} onClick={this.updateFavourite} />
              </div>
            </div>
            <BrewDetail_Recipe recipe={recipe} detailsExpanded={true} />
          </div>
        ) : (
          <div>Still loading</div>
        )}
      </div>
    );
  }
}

export default RecipeDetail;
