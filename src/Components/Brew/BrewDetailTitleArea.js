import React, { Component } from 'react';
import FloatingLabelInput from 'react-floating-label-input';
import Rating from '@material-ui/lab/Rating';
import { withStyles } from '@material-ui/core/styles';

import blankBeerPhoto from '../../resources/BeerPhotoUnloaded.png';

const StyledRating = withStyles({
  iconFilled: {
    color: '#001A33',
  },
  iconHover: {
    color: '#001A33',
  },
})(Rating);

class BrewDetailTitleArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false,
      url: this.props.url,
      brewDetail: this.props.brewDetail,
    };

    this.updateBrewRating = this.updateBrewRating.bind(this);
  }

  componentDidMount() {
    this.setState({ hasLoaded: true });
  }

  componentWillReceiveProps(newProps) {
    this.setState({ brewDetail: newProps.brewDetail });
  }  

  async updateBrewRating(newvalue) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json-patch+json');

    var rawObject = [
      {
        op: 'replace',
        path: '/rating',
        value: newvalue,
      },
    ];

    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: JSON.stringify(rawObject),
      redirect: 'follow',
    };

    var response = await fetch(this.state.url, requestOptions);
    if (response.ok) {
      if (response.json.length > 0) {
        var data = await response.json();

        this.setState({
          brewDetail: data,
        });
      }
      else {
        var updatedBrewDetail = this.state.brewDetail;
        updatedBrewDetail.rating = newvalue;

        this.setState({
          brewDetail: updatedBrewDetail,
        });
      }
    }
  }

  render() {
    const brew = this.state.brewDetail;

    return (
      <div className="grid-brewed-detail-edit">
        <div className="grid-brewed-detail-edit-name">
          {/* https://css-tricks.com/float-labels-css/ */}
          <FloatingLabelInput id="brew-name" label="Name" readOnly={true} value={brew.name} />
        </div>
        <div className="grid-brewed-detail-edit-rating">
          <StyledRating value={brew.rating} precision={0.5} size="small" onChange={(event, newvalue) => this.updateBrewRating(newvalue)} />
        </div>
        <div className="grid-brewed-detail-edit-images">
          <img src={blankBeerPhoto} alt="Capture that beer" />
        </div>
        <div className="grid-brewed-detail-edit-type">
          <FloatingLabelInput id="brew-type" label="Type" readOnly={true} value={brew.recipe.type} />
        </div>
        <div className="grid-brewed-detail-edit-abv">
          <FloatingLabelInput id="brew-abv" label="ABV" readonly={true} value={String(brew.abv)} />
        </div>
      </div>
    );
  }
}

export default BrewDetailTitleArea;
