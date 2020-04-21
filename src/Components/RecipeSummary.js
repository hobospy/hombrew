import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import RecipeSummaryItem from './RecipeSummaryItem';

class RecipeSummary extends Component{
    constructor(props) {
        super(props)
        this.state = {
            hasLoaded: false,
            url: props.baseUrl,
            recipes: []
        }
    }

    componentDidMount () {
        const url = `${this.state.url}recipe/summary`;
        console.log(url);
        axios.get(url).then(response => response.data)
        .then((data) => {
            console.log("DATA: " + data)
            this.setState({ recipes: data})
            console.log(this.state.recipes)
        })
    }

    render () {
        let content;

        content = this.state.recipes.map(r =>
            <NavLink to={`/recipe/${r.id}`}>
                <RecipeSummaryItem key={r.id} recipe={r} />
            </NavLink>)

        return (
            <div className="grid-brew-summary-link-indicator">
                {content}
            </div>
        )
    }
}

export default RecipeSummary;