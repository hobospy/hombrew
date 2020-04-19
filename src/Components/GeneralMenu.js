import React, {Component} from 'react';
import {BrowserRouter as Router, Link, NavLink, Route, Switch} from 'react-router-dom';
import { IoMdBeer, IoMdBook, IoMdWater } from 'react-icons/io';
import { FaBeer } from 'react-icons/fa';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBeer, faBookOpen, faTint } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import MenuBookOutlined from '@material-ui/icons/MenuBookOutlined';
import InvertColorsOutlinedIcon from '@material-ui/icons/InvertColorsOutlined';
import LocalDrinkOutlinedIcon from '@material-ui/icons/LocalDrinkOutlined';

class GeneralMenu extends Component{
    constructor(props) {
        super(props)
        this.state = {
            hasLoaded: false,
            url: props.baseUrl
        };
    }

    render() {
        return (
            <Router>
                <div className="main-menu">
                    <Link to={this.url}>
                    <div className="main-menu-brews">
                        {/* <FaBeer color="#0089CC" size="32px"/> */}
                        {/* <FontAwesomeIcon icon={faBeer} class="fa-border" color="#0089CC" size="xs" style={{ fontSize: "4px"}}/> */}
                        {/* <span className="fa-layers fa-fw">
                            <FontAwesomeIcon icon={faSquare} color="#0089CC" size="8x" />
                            <FontAwesomeIcon icon={faBeer} color="#0089CC" size="6x" style={{ paddingLeft: "8px"}}/>
                        </span> */}
                        {/* <FontAwesomeIcon icon={faBox} color="#0089CC" size="6x" /> */}
                        <LocalDrinkOutlinedIcon style={{ color: "#0089CC" }}/>
                    </div>
                    </Link>
                    <div className="main-menu-recipes">
                        {/* <IoMdBook color="#0089CC" size="32px"/> */}
                        {/* <FontAwesomeIcon icon={faBookOpen} color="#0089CC" size="6x" /> */}
                        <MenuBookOutlined style={{ color: "#0089CC"  }}/>
                    </div>
                    <div className="main-menu-water">
                        {/* <IoMdWater color="#0089CC" size="32px"/> */}
                        {/* <FontAwesomeIcon icon={faTint} color="#0089CC" size="6x" /> */}
                        <InvertColorsOutlinedIcon style={{ color: "#0089CC" }}/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default GeneralMenu;