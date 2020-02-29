import React from 'react';
import dateFormat from 'dateformat';
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

function BrewSummary(props) {
    const brews = props.brewSummary;

    return brews.map( (brew, i) => ( 
        <div className="grid-brew-summary" key={i}>
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
                <div className="grid-brew-summary-image">Img</div>
                {/* <div className="grid-brew-summary-detail-column">
                    <div className="grid-brew-summary-detail-text"> */}
                        <div className="grid-brew-summary-description-text recipe-summary-size recipe-summary-colour">{brew.recipe.description}</div>
                        <div className="grid-brew-summary-tastingNotes-text recipe-summary-size recipe-summary-colour">{brew.tastingNotes}</div>
                    {/* </div>
                </div> */}
            </div>
        </div>
    ));
}

export default BrewSummary;