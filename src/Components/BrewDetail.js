import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';
import CollapsiblePanel from '../Components/CollapsiblePanel';
import DisplayBrewFavourite from '../SupportFunctions/DisplayBrewFavourite';

import blankBeerPhoto from '../resources/BeerPhotoUnloaded.png';

//const API_URL = 'https://localhost:44363/';
const API_URL = 'http://ec2-13-211-100-228.ap-southeast-2.compute.amazonaws.com/';

class BrewDetail extends Component{
    constructor(props) {
        super(props)
        this.state = {
            hasLoaded: false,
            brewDetail: '',
            id: this.props.match.params.id
        }
    }
    componentDidMount() {
        const url = `${API_URL}brew/${this.state.id}`;
        axios.get(url).then(response => response.data)
        .then((data) => {
          this.setState({ brewDetail: data})
          console.log(this.state.brewDetail)
          this.setState({hasLoaded: true})
        })
    }

    render() {
        const brew = this.state.brewDetail;
        console.log("Loaded: " + this.state.hasLoaded);
        console.log(brew);

        return (
            <div className="grid-brewed-detail">
                {this.state.hasLoaded ? (
                <div className="grid-brewed-detail-column">
                    <div className="grid-brewed-detail-title">
                        <div className="grid-brewed-detail-title-text recipe-title-size recipe-title-colour">{brew.name}</div>
                        <div className="grid-brewed-detail-type-text">{brew.recipe.type}</div>
                        <div className="grid-brewed-detail-ABV-text">{brew.abv}%</div>
                        <div className="grid-brewed-detail-favourite-image">
                            <DisplayBrewFavourite brewFavourite={brew.brewFavourite} />
                        </div>                        
                        <div className="grid-brewed-detail-brewdate-text">{moment(brew.brewDate).format('Do-MMM-YYYY')}</div>
                    </div>
                    <div className="grid-brewed-detail-description">
                        <div className="grid-brewed-detail-image">
                            <img className="grid-brewed-detail-image-size" src= {blankBeerPhoto} alt ="Capture that beer"/>
                        </div>
                        <div className="grid-brewed-detail-description-text grid-brewed-detail-column">{brew.recipe.description}</div>
                    </div>
                    <CollapsiblePanel title={'Recipe'} children={'Supposed to be some recipe steps in here'}/>
                        {/* <div className="grid-brewed-detail-recipe">{brew.recipe.steps}</div> */}
                    <div className="grid-brewed-detail-tasting">{brew.tastingNotes}</div>
                </div>
                ) : (
                    <div>Still loading</div>
                )}
            </div>
        );
    }
}

export default BrewDetail;