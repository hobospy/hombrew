import React from 'react';
import moment from 'moment';
import blankBeerPhoto from '../resources/BeerPhotoUnloaded.png';
import DisplayBrewFavourite from '../SupportFunctions/DisplayBrewFavourite';

function BrewSummaryItem(props) {
    const brew = props.brew;

    return ( 
        <div className="grid-brew-summary">
            <div className="grid-brew-summary-column">
                <div className="grid-brew-summary-title">
                    <div className="grid-brew-summary-title-column recipe-title-size recipe-title-colour">{brew.name}</div>
                    <div className="grid-brew-summary-title-column">{moment(brew.brewDate).format('Do-MMM-YYYY')}</div>
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
            <div>{brew.brewDate}</div>
        </div>
    );
}

export default BrewSummaryItem;