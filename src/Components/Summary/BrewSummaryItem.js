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

function BrewSummaryItem(props) {
  const brew = props.brew;

  return (
    <div className="grid-brew-summary">
      <div className="grid-brew-summary-title">
        <div className="grid-brew-summary-title-beer-title recipe-title-size">{brew.name}</div>
        <div className="recipe-summary-date grid-brew-summary-title-beer-brewdate">{moment(brew.brewDate).format('Do-MMM-YYYY')}</div>
        <div className="grid-brew-summary-title-beer-type">{brew.recipe.type}</div>
        <div className="grid-brew-summary-title-beer-favourite">
          <StyledRating className="recipe-summary-rating" value={brew.rating} precision={0.5} size="small" readOnly="true" />
        </div>
      </div>
      <div className="grid-brew-summary-detail">
        <div className="grid-brew-summary-image">
          <img className="recipe-summary-beer-image-size" src={blankBeerPhoto} alt="Capture that beer" />
        </div>
        <TextTruncate className="grid-brew-summary-description-text" line={3} truncateText=" ..." text={brew.recipe.description} />
        <TextTruncate className="grid-brew-summary-tastingNotes-text" line={3} truncateText=" ..." text={brew.tastingNotes.note} />
      </div>
    </div>
  );
}

export default BrewSummaryItem;
