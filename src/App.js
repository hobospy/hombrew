import React, {Component} from 'react';
import axios from 'axios';
const API_URL = 'https://localhost:44363/';

class App extends Component {
  state = {
    brews: []
  }

  componentDidMount() {
    const url = `${API_URL}brew/summary`;
    axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ brews: data})
      console.log(this.state.users)
    })
  }

  render() {
    return (
      <div className="container">
        <div className="col-xs-8">
          <h1>React Axios Example</h1>
          {this.state.brews.map((brew) => (
            <div className="card" style={{border: '0px'}}>
              <div clasName="card-body">
                <h5 className="card-title">{brew.name}</h5>
              </div>
            </div>
          ))}
          <p class="text-center"><i><small>Some closing text</small></i></p>
        </div>
      </div>
    );
  }
}

export default App;
