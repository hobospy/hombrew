import React from 'react';
import Favourite from '../../SupportFunctions/Favourite';

export default function BrewAddItem(props) {
  const recipe = props.recipe;

  return (
    <div>
      <div className="brew-add-grid">
        <div className="brew-add-title recipe-title-size">{recipe.name}</div>
        <div className="brew-add-favourite">
          <Favourite favourite={recipe.favourite} />
        </div>
        <div className="brew-add-type">{recipe.type}</div>
        <div className="brew-add-expected-abv">Expected ABV: {recipe.expectedABV}</div>
        <div className="brew-add-description">{recipe.description}</div>
      </div>
    </div>
  );
}
