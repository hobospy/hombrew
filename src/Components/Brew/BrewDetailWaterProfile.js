import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const CssTextField = withStyles({
  root: {
    '& .Mui-disabled': {
      color: '#001a33',
    },
    '& label.Mui-focused': {
      color: '#001a33',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#001a33',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#001a33',
      },
    },
  },
})(TextField);

class BrewDetail_WaterProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoadedWaterProfile: false,
      waterProfile: this.props.waterProfile,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return { waterProfile: nextProps.waterProfile };
  }

  componentDidMount() {
    this.setState({ hasLoadedWaterProfile: true });
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
          <div>
            <div className="water-profile-name">{waterProfile.name}</div>
            <div className="water-profile-container">
              {waterProfile.additions.map((a) => (
                <p className="brewed-beer-water-profile-item">
                  <CssTextField disabled id={a.id} InputProps={{ disableUnderline: true }} label={a.name} value={String(a.amount) + a.unit} />
                </p>
              ))}
            </div>
          </div>
        )}
      </span>
    );

    return <div>{content}</div>;
  }
}

export default BrewDetail_WaterProfile;
