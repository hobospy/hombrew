import React, { useState } from 'react';
import BrewDetail_WaterProfile from '../Components/BrewDetail_WaterProfile';

function WaterProfileSummaryItem(props) {
  const waterProfile = props.waterProfile;

  return (
    <div className="water-profile-summary-container">
      <div className="water-profile-summary-name recipe-title-size recipe-title-colour">{waterProfile.name}</div>
      <BrewDetail_WaterProfile waterProfile={waterProfile} />
    </div>
  );
}

export default WaterProfileSummaryItem;
