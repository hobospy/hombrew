import React, {Component} from 'react';
import MenuBookOutlined from '@material-ui/icons/MenuBookOutlined';
import InvertColorsOutlinedIcon from '@material-ui/icons/InvertColorsOutlined';
import LocalDrinkOutlinedIcon from '@material-ui/icons/LocalDrinkOutlined';

class NavBarMenu extends Component{
    constructor(props) {
        super(props)
        this.state = {
            hasLoaded: false,
            url: props.baseUrl
        };
    }

    render() {
        return (
            <div className="main-menu">
                <div className="main-menu-brews">
                    <a href="/" className="main-menu-button">
                        <div className="main-menu-button-background">
                            <LocalDrinkOutlinedIcon fontSize='inherit' color='inherit'/>
                        </div>
                    </a>
                </div>
                <div className="main-menu-recipes">
                    <a href="/" className="main-menu-button">
                        <div className="main-menu-button-background">
                            <MenuBookOutlined fontSize='inherit' color='inherit'/>
                        </div>
                    </a>
                </div>
                <div className="main-menu-water">
                    <a href="/" className="main-menu-button">
                        <div className="main-menu-button-background">
                            <InvertColorsOutlinedIcon fontSize='inherit' color='inherit'/>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}

export default NavBarMenu;