import React, { Component } from 'react';
import FloatingLabelInput from 'react-floating-label-input';

class BrewDetail_WaterProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoadedWaterProfile: false,
      waterProfile: this.props.waterProfile,
    };
  }

  // componentWillReceiveProps(newProps) {
  //   this.setState({ waterProfile: newProps.waterProfile });
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    return { waterProfile: nextProps.waterProfile };
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

    content = (
      <span>
        {waterProfile.additions.length === 0 || waterProfile.additions === undefined ? (
          <div>No waterprofile additions</div>
        ) : (
          <div className="water-profile-container">
            {waterProfile.additions.map((a) => (
              <p className="brewed-beer-water-profile-item">
                <FloatingLabelInput id={a.id} label={a.name} onChange={this.changingItem} value={String(a.amount) + a.unit} />
              </p>
            ))}
          </div>
        )}
      </span>
    );

    return <div>{content}</div>;
  }
}

export default BrewDetail_WaterProfile;
