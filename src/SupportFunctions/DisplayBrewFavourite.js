import React from 'react';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

function DisplayBrewFavourite(props) {
    const brewFavourite = props.brewFavourite;

    if (brewFavourite === true)
    {
        return <Favorite style={{ color: "#0089CC", fontSize: "large", zIndex: 1}}/>
    }

    return <FavoriteBorder style={{ color: "#0089CC", fontSize: "large", zIndex: 1 }}/>
}

export default DisplayBrewFavourite;