import React, { Component } from 'react';
import FloatingLabelInput, { action } from 'react-floating-label-input';

class BrewDetail_WaterProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoadedWaterProfile: false,
      waterProfile: this.props.waterProfile,
    };
  }

  componentDidMount() {
    this.setState({ hasLoadedWaterProfile: true });
  }

  changingItem() {
    console.log('Output here - water profile');
  }

  render() {
    const waterProfile = this.state.waterProfile;
    console.log(waterProfile);

    let content;

    content = this.state.waterProfile.additions.map((a) => (
      <div className="brewed-beer-water-profile-item">
        <FloatingLabelInput id={a.id} label={a.name} onChange={this.changingItem} value={String(a.amount) + a.unit} />
      </div>
    ));

    return <div className="water-profile-container">{content}</div>;
  }
}

export default BrewDetail_WaterProfile;
