import React from 'react';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

function Favourite(props) {
  const favourite = props.favourite;

  if (favourite === true) {
    return (
      <Favorite style={{ color: '#001A33', fontSize: '26px', zIndex: 1 }} />
    );
  }

  return (
    <FavoriteBorder style={{ color: '#001A33', fontSize: '26px', zIndex: 1 }} />
  );
}

export default Favourite;
