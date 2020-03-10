import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import axios from 'axios';

import BrewSummaryItem from "./Components/BrewSummaryItem";
import BrewDetail from "./Components/BrewDetail";
import './atomicStyling.css';

//const API_URL = 'https://localhost:44363/';
const API_URL = 'http://ec2-13-211-100-228.ap-southeast-2.compute.amazonaws.com/';

class DebugRouter extends Router {
  constructor(props) {
    super(props);
    console.log('initial history is: ', JSON.stringify(this.history, null, 2))
    this.history.listen((location, action)=>{
      console.log(
        `The current URL is ${location.pathname}${location.search}${location.hash}`
      )
      console.log(`The last navigation action was ${action}`, JSON.stringify(this.history, null, 2));
    });
  }
}

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      brews: []
    };
  }

  componentDidMount() {
    const url = `${API_URL}brew/summary`;
    axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ brews: data})
      console.log(this.state.brews)
    })
  }

  render() {
    let content;

    content = this.state.brews.map(b =>
      <Link to={`/brew/${b.id}`}>
        <BrewSummaryItem key={b.id} brew={b} />
      </Link>
      )
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/brew/:id" component={BrewDetail}/>
            <Route exact={true} path="/*" render={() => content}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;