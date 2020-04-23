import React, { Compoent, Component } from 'react';
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

    return (
      <div className="water-profile-container">
        <div className="brewed-beer-water-profile-item">
          <FloatingLabelInput
            id="wp-lacticAcid"
            label="Lactic acid"
            onChange={this.changingItem}
            value={String(waterProfile.lacticAcid)}
          />
        </div>
        <div className="brewed-beer-water-profile-item">
          <FloatingLabelInput
            id="wp-gypsum"
            label="Gypsum"
            onChange={this.changingItem}
            value={String(waterProfile.gypsum)}
          />
        </div>
        <div className="brewed-beer-water-profile-item">
          <FloatingLabelInput
            id="wp-calciumChloride"
            label="CalciumChloride"
            onChange={this.changingItem}
            value={String(waterProfile.calciumChloride)}
          />
        </div>
        <div className="brewed-beer-water-profile-item">
          <FloatingLabelInput
            id="wp-epsomSalt"
            label="Epsom salt"
            onChange={this.changingItem}
            value={String(waterProfile.epsomSalt)}
          />
        </div>
        <div className="brewed-beer-water-profile-item">
          <FloatingLabelInput
            id="wp-nonIodizedSalt"
            label="NonIodizedSalt"
            onChange={this.changingItem}
            value={String(waterProfile.nonIodizedSalt)}
          />
        </div>
        <div className="brewed-beer-water-profile-item">
          <FloatingLabelInput
            id="wp-bakingSoda"
            label="Baking soda"
            onChange={this.changingItem}
            value={String(waterProfile.bakingSoda)}
          />
        </div>
      </div>
    );
  }
}

export default BrewDetail_WaterProfile;
