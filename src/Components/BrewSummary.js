import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import BrewSummaryItem from './BrewSummaryItem';

class BrewSummary extends Component{
    constructor(props) {
        super(props)
        this.state = {
            hasLoaded: false,
            url: props.baseUrl,
            brews: []
        }
    }

    componentDidMount () {
        const url = `${this.state.url}brew/summary`;
        axios.get(url).then(response => response.data)
        .then((data) => {
            this.setState({ brews: data})
        })
    }

    render () {
        let content;

        content = this.state.brews.map(b =>
            <NavLink to={'/brew/${b.id}'}>
                <BrewSummaryItem key={b.id} brew={b} />
            </NavLink>)

        return (
            <div className="testContainer">
            <div className="test">
            <div className="grid-brew-summary-link-indicator">
                {content}
            </div>
            </div>
            </div>
        )
    }
}

export default BrewSummary;