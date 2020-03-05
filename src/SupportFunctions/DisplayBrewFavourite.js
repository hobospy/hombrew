import React from 'react';
import thumbsDown from '../resources/Thumbs-Down-Circle.svg';
import thumbsUp from '../resources/Thumbs-Up-Circle.svg';

function DisplayBrewFavourite(props) {
    const brewFavourite = props.brewFavourite;

    if (brewFavourite === true)
    {
        return <img className="recipe-summary-favourite-size" src={thumbsUp} alt="Great beer"/>;
    }

    return <img className="recipe-summary-favourite-size" src={thumbsDown} alt="Dodgy beer"/>;
}

export default DisplayBrewFavourite;