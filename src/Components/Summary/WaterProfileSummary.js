import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import WaterProfileSummaryItem from './WaterProfileSummaryItem';

class WaterProfileSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false,
      url: props.baseUrl,
      waterProfiles: [],
    };
  }

  componentDidMount() {
    const url = `${this.state.url}waterprofile/summary`;
    console.log({ url });
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ waterProfiles: data });
      });
  }

  render() {
    let content;

    content = this.state.waterProfiles.map((wp) => (
      <NavLink to={`/waterprofile/${wp.id}`}>
        <WaterProfileSummaryItem key={wp.id} waterProfile={wp} />
      </NavLink>
    ));

    return <div className="grid-brew-summary-link-indicator">{content}</div>;
  }
}

export default WaterProfileSummary;
