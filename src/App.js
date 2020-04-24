import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import BrewDetail from './Components/BrewDetail';
import RecipeSummary from './Components/RecipeSummary';
import './atomicStyling.css';
import NavBarMenu from './Components/NavBarMenu';

import AppBar from '@material-ui/core/AppBar';
import BrewSummary from './Components/BrewSummary';
import WaterProfileSummary from './Components/WaterProfileSummary';
import RecipeDetail from './Components/RecipeDetail';
import BrewDetail_Recipe from './Components/BrewDetail_Recipe';

const API_URL = process.env.NODE_ENV === 'production' ? 'http://ec2-13-211-100-228.ap-southeast-2.compute.amazonaws.com/' : 'https://localhost:44363/';

class DebugRouter extends Router {
  constructor(props) {
    super(props);
    console.log('initial history is: ', JSON.stringify(this.history, null, 2));
    this.history.listen((location, action) => {
      console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`);
      console.log(`The last navigation action was ${action}`, JSON.stringify(this.history, null, 2));
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
    console.log('Data source URL: ' + url);
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ brews: data });
        console.log(this.state.brews);
      });
  }

  render() {
    return (
      <DebugRouter>
        <AppBar position="fixed">
          <NavBarMenu baseUrl="/" />
        </AppBar>
        <div className="testMainPage">
          <Switch>
            <Route exact={true} path="/brew/summary/" render={(props) => <BrewSummary {...props} baseUrl={API_URL} />} />
            <Route path="/brew/:id" render={(props) => <BrewDetail {...props} baseUrl={API_URL} />} />
            <Route exact={true} path="/recipe/summary/" render={(props) => <RecipeSummary {...props} baseUrl={API_URL} />} />
            <Route path="/recipe/:id" render={(props) => <RecipeDetail {...props} baseUrl={API_URL} />} />
            <Route exact={true} path="/waterprofile/summary/" render={(props) => <WaterProfileSummary {...props} baseUrl={API_URL} />} />
            {/* <Route path="/waterprofile/:id" render={(props) => <WaterProfileDetail {...props} baseUrl={API_URL} />} /> */}
            <Route exact={true} path="/*" render={(props) => <BrewSummary {...props} baseUrl={API_URL} />} />
          </Switch>
        </div>
      </DebugRouter>
    );
  }
}

export default App;
