import React, { Component } from 'react';
import axios from 'axios';
import FloatingLabelInput from 'react-floating-label-input';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';

import blankBeerPhoto from '../../resources/BeerPhotoUnloaded.png';
import BrewDetailRecipe from './BrewDetailRecipe';
import CollapsiblePanel from '../SupportComponents/CollapsiblePanel';
import LoadingIndicator from '../SupportComponents/LoadingIndicator';

const StyledRating = withStyles({
  iconFilled: {
    color: '#001A33',
  },
  iconHover: {
    color: '#001A33',
  },
})(Rating);

const styles = (theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    height: 35,
    width: 35,
    '&:hover, &:focus': {
      outline: 'none',
    },
  },
});

class BrewDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false,
      editMenuDisplayed: false,
      brewDetail: '',
      url: `${this.props.baseUrl}brew/${this.props.match.params.id}`,
      id: this.props.match.params.id,
    };
  }

  componentDidMount() {
    console.log(this.state.url);
    axios
      .get(this.state.url)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ brewDetail: data });
        this.setState({ hasLoaded: true });
      });
  }

  displayEditMenu = () => {
    return this.setState({ editMenuDisplayed: !this.state.editMenuDisplayed });
  };

  render() {
    const brew = this.state.brewDetail;

    return (
      <div className="grid-brewed-detail">
        {this.state.hasLoaded ? (
          <div>
            <div className="grid-brewed-detail-column">
              <div className="grid-brewed-detail-edit">
                <div className="grid-brewed-detail-edit-name">
                  {/* https://css-tricks.com/float-labels-css/ */}
                  <FloatingLabelInput id="brew-name" label="Name" onChange={this.changingItem} value={brew.name} />
                </div>
                <div className="grid-brewed-detail-edit-rating">
                  <StyledRating value={brew.rating} precision={0.5} size="small" readOnly="true" />
                </div>
                <div className="grid-brewed-detail-edit-images">
                  <img src={blankBeerPhoto} alt="Capture that beer" />
                </div>
                <div className="grid-brewed-detail-edit-type">
                  <FloatingLabelInput id="brew-type" label="Type" onChange={this.changingItem} value={brew.recipe.type} />
                </div>
                <div className="grid-brewed-detail-edit-abv">
                  <FloatingLabelInput id="brew-abv" label="ABV" onChange={this.changingItem} value={String(brew.abv)} />
                </div>
              </div>
              <CollapsiblePanel
                title={'Recipe - ' + brew.recipe.name}
                children={<BrewDetailRecipe recipe={brew.recipe} detailsExpanded={false} />}
                open={false}
              />
              <CollapsiblePanel title={'Tasting notes'} children={brew.tastingNotes} open={true} />
            </div>
          </div>
        ) : (
          <LoadingIndicator />
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(BrewDetail);
