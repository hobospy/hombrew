import React from 'react';
import dateFormat from 'dateformat';
import blankBeerPhoto from '../resources/BeerPhotoUnloaded.png';
import DisplayBrewFavourite from '../SupportFunctions/DisplayBrewFavourite';

function BrewSummaryItem(props) {
    const brew = props.brew;

    return ( 
        <div className="grid-brew-summary">
            <div className="grid-brew-summary-column">
                <div className="grid-brew-summary-title">
                    <div className="grid-brew-summary-title-column recipe-title-size recipe-title-colour">{brew.name}</div>
                    <div className="grid-brew-summary-title-column">{dateFormat(new Date(brew.brewDate), "dd-mmm-yyyy")}</div>
                    <div className="grid-brew-summary-title-column">
                        <DisplayBrewFavourite brewFavourite={brew.brewFavourite} />
                    </div>
                </div>
            </div>
            <div className="grid-brew-summary-detail">
                <div className="grid-brew-summary-image">
                    <img className="recipe-summary-beer-image-size" src= {blankBeerPhoto} alt ="Capture that beer"/>
                </div>
                <div className="grid-brew-summary-description-text recipe-summary-size recipe-summary-colour">{brew.recipe.description}</div>
                <div className="grid-brew-summary-tastingNotes-text recipe-summary-size recipe-summary-colour">{brew.tastingNotes}</div>
            </div>
        </div>
    );
}

export default BrewSummaryItem;