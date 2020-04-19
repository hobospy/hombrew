import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';
import FloatingLabelInput, {action} from 'react-floating-label-input';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles, withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import CollapsiblePanel from '../Components/CollapsiblePanel';
import BrewDetail_Recipe from '../Components/BrewDetail_Recipe';
import DisplayBrewFavourite from '../SupportFunctions/DisplayBrewFavourite';

import blankBeerPhoto from '../resources/BeerPhotoUnloaded.png';
import { blue } from '@material-ui/core/colors';

import EditSpeedDial from '../SupportFunctions/EditSpeedDial';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#0089CC',
        },
        secondary: {
            main: '#f66636',
        }
    }
});

const styles = theme => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        height: 35,
        width: 35,
        '&:hover, &:focus': {
            outline: 'none',
        },
    }
});

class BrewDetail extends Component{
    constructor(props) {
        super(props)
        this.state = {
            hasLoaded: false,
            editingBrew: false,
            brewDetail: '',
            url: `${this.props.baseUrl}brew/${this.props.match.params.id}`,
            id: this.props.match.params.id
        };

        this.updateFavourite = this.updateFavourite.bind(this);
    }

    componentDidMount() {
        console.log(this.state.url);
        axios.get(this.state.url).then(response => response.data)
        .then((data) => {
          this.setState({ brewDetail: data})
          this.setState({hasLoaded: true})
        })
    }

    updateFavourite = async event => {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json-patch+json");
        
        var data = [ 
            {
                "op": "replace",
                "path": "/BrewFavourite",
                "value": !this.state.brewDetail.brewFavourite
            }
        ];
        var raw = JSON.stringify(data);
        
        var requestOptions = {
          method: 'PATCH',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        console.log(raw);
        console.log(requestOptions);

        fetch(this.state.url, requestOptions)
        .then(response => response.json())
        .then(response => {
            this.setState({
                brewDetail: response
            });
        });
    };

    changingItem () {
        console.log("Output here");
    };

    editItem = () => {
        return this.setState({ editingBrew: !this.state.editingBrew});
    };

    render() {
        const brew = this.state.brewDetail;
        const { classes } = this.props;
        console.log(brew);

        return (
            <div className="grid-brewed-detail">
                {this.state.hasLoaded ? (
                    <div>
                        <div className="grid-brewed-detail-column">
                            <div className="grid-brewed-detail-edit">
                                <div className="grid-brewed-detail-edit-name">
                                {/* https://css-tricks.com/float-labels-css/ */}
                                    <FloatingLabelInput
                                        id="brew-name"
                                        label="Name"
                                        onChange={this.changingItem}
                                        value={brew.name}
                                    />
                                </div>
                                <div className="grid-brewed-detail-edit-favourite" onClick={this.updateFavourite}>
                                    <DisplayBrewFavourite brewFavourite={brew.brewFavourite}/>
                                </div>
                                <div className="grid-brewed-detail-edit-images">
                                    <img src= {blankBeerPhoto} alt ="Capture that beer"/>
                                </div>
                                <div className="grid-brewed-detail-edit-type">
                                    <FloatingLabelInput
                                        id="brew-type"
                                        label="Type"
                                        onChange={this.changingItem}
                                        value={brew.recipe.type}
                                    />
                                </div>
                                <div className="grid-brewed-detail-edit-abv">
                                    <FloatingLabelInput
                                        id="brew-abv"
                                        label="ABV"
                                        onChange={this.changingItem}
                                        value={String(brew.abv)}
                                    />
                                </div>
                            </div>
                            <CollapsiblePanel title={'Recipe - ' + brew.recipe.name} children={<BrewDetail_Recipe recipe={brew.recipe}/>} open={false}/>
                            <CollapsiblePanel title={'Tasting notes'} children={brew.tastingNotes} open={true}/>
                        </div>
                        <MuiThemeProvider theme={theme} >
                            <Fab aria-label="edit" color="primary" className={classes.fab} onClick={this.editItem} style={{}}>
                                {this.state.editingBrew ? (
                                    <SaveIcon fontSize="small"/>
                                ) : (
                                    <EditIcon fontSize="small"/>
                                )}
                            </Fab>
                        </MuiThemeProvider>
                    </div>
                ) : (
                    <div>Still loading</div>
                )}
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(BrewDetail);