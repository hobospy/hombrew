import React from 'react';
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

function RecipeSummaryItem(props) {
    const recipe = props.recipe;

    return (
        <div>
            <div className="recipe-summary-container">
                <div className="recipe-summary-name recipe-title-size recipe-title-colour">{recipe.name}</div>
                <div className="recipe-summary-type recipe-title-colour">{recipe.type}</div>
                <StyledRating className="recipe-summary-rating" value={recipe.rating} precision={0.5} size="small" readOnly="true" />
                <div className="recipe-summary-description recipe-summary-colour">{recipe.description}</div>
            </div>
        </div>
    )
}

export default RecipeSummaryItem;