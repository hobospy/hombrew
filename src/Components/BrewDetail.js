import React, {Component} from 'react';
import axios from 'axios';
import dateFormat from 'dateformat';

import thumbsDown from '../resources/Thumbs-Down-Circle.svg';
import thumbsUp from '../resources/Thumbs-Up-Circle.svg';
import blankBeerPhoto from '../resources/BeerPhotoUnloaded.png';

const API_URL = 'https://localhost:44363/';

class BrewDetail extends Component{
    constructor(props) {
        super(props)
        this.state = {
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
        })
    }

    render() {
        return (
            <div>
                <p>Name: {this.state.brewDetail.name}</p>
                <p>ABV: {this.state.brewDetail.abv}</p>
                <p>Notes: {this.state.brewDetail.notes}</p>
                <p>Some brew detail text</p>
            </div>
        );
    }
}

export default BrewDetail;