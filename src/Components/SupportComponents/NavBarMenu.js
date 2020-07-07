import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import MenuBookOutlined from '@material-ui/icons/MenuBookOutlined';
import InvertColorsOutlinedIcon from '@material-ui/icons/InvertColorsOutlined';
import LocalDrinkOutlinedIcon from '@material-ui/icons/LocalDrinkOutlined';
// import BackgroundImage from '../resources/grain.jpg';

class NavBarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false,
      url: props.baseUrl,
    };
  }

  render() {
    return (
      <div className="main-menu">
        <div className="main-menu-brews">
          <NavLink to={`/brew/summary`} className="main-menu-button">
            <LocalDrinkOutlinedIcon fontSize="inherit" color="inherit" />
          </NavLink>
        </div>
        <div className="main-menu-recipes">
          <NavLink to={`/recipe/summary`} className="main-menu-button">
            <MenuBookOutlined fontSize="inherit" color="inherit" />
          </NavLink>
        </div>
        <div className="main-menu-water">
          <NavLink to={`/waterprofile/summary`} className="main-menu-button">
            <InvertColorsOutlinedIcon fontSize="inherit" color="inherit" />
          </NavLink>
        </div>
      </div>
    );
  }
}

export default NavBarMenu;
