import React from 'react';
import moment from 'moment';
import TextTruncate from 'react-text-truncate';
import blankBeerPhoto from '../../resources/BeerPhotoUnloaded.png';
import Rating from '@material-ui/lab/Rating';
import { withStyles } from '@material-ui/core/styles';

const StyledRating = withStyles({
  iconFilled: {
    color: '#001A33',
  },
  iconHover: {
    color: '#001A33',
  },
})(Rating);

function BrewSummaryItemMobile(props) {
  const brew = props.brew;

  return (
    <div className="brew-summary-mobile-item-grid">
      <div className="brew-summary-mobile-item-grid-title recipe-title-size">{brew.name}</div>
      <div className="brew-summary-mobile-item-grid-rating">
        <StyledRating className="recipe-summary-rating" value={brew.rating} precision={0.5} size="small" readOnly="true" />
      </div>
      <div className="brew-summary-mobile-item-grid-type">{brew.recipe.type}</div>
      <div className="brew-summary-mobile-item-grid-brewdate recipe-summary-date">{moment(brew.brewDate).format('Do-MMM-YYYY')}</div>
      <div className="brew-summary-mobile-item-grid-image">
        <img className="brew-summary-mobile-item-grid-image-size" src={blankBeerPhoto} alt="Capture that beer" />
      </div>
      <div className="brew-summary-mobile-item-grid-description">
        <TextTruncate line={3} truncateText=" ..." text={brew.recipe.description} />
      </div>
      <div className="brew-summary-mobile-item-grid-notes">
        <TextTruncate line={3} truncateText=" ..." text={brew.tastingNotes.note} />
      </div>
    </div>
  );
}

export default BrewSummaryItemMobile;
