import React from 'react';
import BrewDetailWaterProfile from '../Brew/BrewDetailWaterProfile';

function WaterProfileSummaryItem(props) {
  const waterProfile = props.waterProfile;

  return (
    <div className="water-profile-summary-container">
      <div className="water-profile-summary-name recipe-title-size">{waterProfile.name}</div>
      <BrewDetailWaterProfile waterProfile={waterProfile} />
    </div>
  );
}

export default WaterProfileSummaryItem;
