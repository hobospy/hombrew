import React, {Component} from 'react';
import {BrowserRouter as Router, Link, NavLink, Route, Switch} from 'react-router-dom';
import MenuBookOutlined from '@material-ui/icons/MenuBookOutlined';
import InvertColorsOutlinedIcon from '@material-ui/icons/InvertColorsOutlined';
import LocalDrinkOutlinedIcon from '@material-ui/icons/LocalDrinkOutlined';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const styles = theme => ({
    menuButton: {
        '&:hover, &:focus': {
            color: '#d3d3d3',
        },
    }
});

class GeneralMenu extends Component{
    constructor(props) {
        super(props)
        this.state = {
            hasLoaded: false,
            url: props.baseUrl
        };
    }

    render() {
        const { classes } = this.props;

        return (
            <Router>
                <div className="main-menu">
                    <div className="main-menu-brews">
                        <a href="/" className="main-menu-button">
                            <div style={{display: 'flex', lineHeight: '40px' }}>
                                <LocalDrinkOutlinedIcon fontSize='inherit' className={classes.menuButton} />
                            </div>
                        </a>
                        {/* <Button variant="outlined"><LocalDrinkOutlinedIcon fontSize='inherit' color='inherit'/></Button> */}
                    </div>
                    <div className="main-menu-recipes">
                        <a href="/" className="main-menu-button">
                            <div style={{display: 'flex', lineHeight: '40px' }}>
                                <MenuBookOutlined fontSize='inherit' color='inherit'/>
                            </div>
                        </a>
                    </div>
                    <div className="main-menu-water">
                        <a href="/" className="main-menu-button">
                            <div style={{display: 'flex', lineHeight: '40px' }}>
                                <InvertColorsOutlinedIcon fontSize='inherit' color='inherit'/>
                            </div>
                        </a>
                    </div>
                </div>
            </Router>
        );
    }
}


export default withStyles(styles, { withTheme: true })(GeneralMenu);