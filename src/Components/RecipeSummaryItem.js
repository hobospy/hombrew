import React from 'react';
import Favourite from '../SupportFunctions/Favourite';

function RecipeSummaryItem(props) {
  const recipe = props.recipe;

  return (
    <div>
      <div className="recipe-summary-container">
        <div className="recipe-summary-name recipe-title-size recipe-title-colour">{recipe.name}</div>
        <div className="recipe-summary-type recipe-title-colour">{recipe.type}</div>
        <div className="recipe-summary-favourite">
          <Favourite favourite={recipe.favourite} />
        </div>
        <div className="recipe-summary-description recipe-summary-colour">{recipe.description}</div>
      </div>
    </div>
  );
}

export default RecipeSummaryItem;
