import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';
import FloatingLabelInput, {action} from 'react-floating-label-input';
import CollapsiblePanel from '../Components/CollapsiblePanel';
import BrewDetail_Recipe from '../Components/BrewDetail_Recipe';
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
        console.log(url);
        axios.get(url).then(response => response.data)
        .then((data) => {
          this.setState({ brewDetail: data})
          this.setState({hasLoaded: true})
        })
    }

    changingItem () {
        console.log("Output here");
    };

    render() {
        const brew = this.state.brewDetail;
        console.log(brew);

        return (
            <div className="grid-brewed-detail">
                {this.state.hasLoaded ? (
                <div className="grid-brewed-detail-column">
                    <div className="grid-brewed-detail-edit">
                        <div className="grid-brewed-detail-edit-name">
                        {/* https://css-tricks.com/float-labels-css/ */}
                            <FloatingLabelInput
                                id="brew-name"
                                label="Name"
                                onChange={this.changingItem}
                                value={brew.name}
                            />
                        </div>
                        <div className="grid-brewed-detail-edit-favourite">
                            <DisplayBrewFavourite brewFavourite={brew.brewFavourite} />
                        </div>
                        <div className="grid-brewed-detail-edit-images">
                            <img src= {blankBeerPhoto} alt ="Capture that beer"/>
                        </div>
                        <div className="grid-brewed-detail-edit-type">
                            <FloatingLabelInput
                                id="brew-type"
                                label="Type"
                                onChange={this.changingItem}
                                value={brew.recipe.type}
                            />
                        </div>
                        <div className="grid-brewed-detail-edit-abv">
                            <FloatingLabelInput
                                id="brew-abv"
                                label="ABV"
                                onChange={this.changingItem}
                                value={String(brew.abv)}
                            />
                        </div>
                    </div>
                    <CollapsiblePanel title={'Recipe - ' + brew.recipe.name} children={<BrewDetail_Recipe recipe={brew.recipe}/>} open={false}/>
                    <CollapsiblePanel title={'Tasting Notes'} children={brew.tastingNotes} open={true}/>
                </div>
                ) : (
                    <div>Still loading</div>
                )}
            </div>
        );
    }
}

export default BrewDetail;