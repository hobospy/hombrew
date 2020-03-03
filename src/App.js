import React, {Component} from 'react';
import axios from 'axios';

import BrewSummary from "./Components/BrewSummary";
import './atomicStyling.css';

const API_URL = 'https://localhost:44363/';
//const API_URL = 'https://192.168.1.37:44363/';

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
    return (
      <div className="grid-page app-default-font">
        <div className="grid-page-column">
          <BrewSummary brewSummary={this.state.brews}/>
          <p><i><small>Some closing text :-| ${API_URL}brew/summary</small></i></p>
        </div>
      </div>
    );
  }
}

export default App;
