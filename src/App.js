import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import axios from 'axios';

import BrewDetail from './Components/Brew/BrewDetail';
import BrewSummary from './Components/Summary/BrewSummary';
import NavBarMenu from './Components/SupportComponents/NavBarMenu';
import RecipeDetail from './Components/Recipe/RecipeDetail';
import RecipeSummary from './Components/Summary/RecipeSummary';
import WaterProfileSummary from './Components/Summary/WaterProfileSummary';

import './css/atomicStyling.css';

const API_URL = process.env.NODE_ENV === 'production' ? 'https://www.thehomebrewapi.com/' : 'https://localhost:44363/';

class DebugRouter extends Router {
  constructor(props) {
    super(props);
    this.history.listen((location, action) => {
      console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`);
    });
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      brews: [],
    };
  }

  componentDidMount() {
    const url = `${API_URL}brew/summary`;
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ brews: data });
        console.log(this.state.brews);
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error when retrieving data from: ' + url + ' - ' + error.message);
        }
      });
  }

  render() {
    return (
      <DebugRouter>
        <AppBar position="fixed">
          <NavBarMenu baseUrl="/" />
        </AppBar>
        <div className="bodyStyle">
          <Switch>
            <Route exact={true} path="/brew/summary/" render={(props) => <BrewSummary {...props} baseUrl={API_URL} />} />
            <Route path="/brew/:id" render={(props) => <BrewDetail {...props} baseUrl={API_URL} />} />
            <Route exact={true} path="/recipe/summary/" render={(props) => <RecipeSummary {...props} baseUrl={API_URL} />} />
            <Route path="/recipe/:id" render={(props) => <RecipeDetail {...props} baseUrl={API_URL} />} />
            <Route exact={true} path="/waterprofile/summary/" render={(props) => <WaterProfileSummary {...props} baseUrl={API_URL} />} />
            <Route exact={true} path="/*" render={(props) => <BrewSummary {...props} baseUrl={API_URL} />} />
          </Switch>
        </div>
      </DebugRouter>
    );
  }
}

export default App;
