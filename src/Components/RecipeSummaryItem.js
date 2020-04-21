import React from 'react';

function RecipeSummaryItem(props) {
    const recipe = props.recipe;

    return (
        <div>Name: {recipe.name}</div>
    )
}

export default RecipeSummaryItem;