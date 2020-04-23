import React, { useState } from 'react';

function WaterProfileSummaryItem(props){
    const waterProfile = props.waterProfile;

    return (
        <div>{waterProfile.name}</div>
    );
}

export default WaterProfileSummaryItem;