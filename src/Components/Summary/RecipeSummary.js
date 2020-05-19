import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import RecipeSummaryItem from './RecipeSummaryItem';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#001A33',
      },
      secondary: {
        main: '#f66636',
      },
    },
  });
  
  const styles = (theme) => ({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      height: 35,
      width: 35,
      '&:hover, &:focus': {
        outline: 'none',
      },
    },
  });

class RecipeSummary extends Component{
    constructor(props) {
        super(props)
        this.state = {
            hasLoaded: false,
            url: props.baseUrl,
            recipes: []
        }
    }

    componentDidMount () {
        const url = `${this.state.url}recipe/summary`;
        console.log(url);
        axios.get(url).then(response => response.data)
        .then((data) => {
            console.log("DATA: " + data)
            this.setState({ recipes: data})
            this.setState({ hasLoaded: true})
            console.log(this.state.recipes)
        })
    }

    render () {
        let content;

        content = this.state.recipes.map(r =>
            <NavLink to={`/recipe/${r.id}`}>
                <RecipeSummaryItem key={r.id} recipe={r} />
            </NavLink>)

        return (
            <div className="grid-brew-summary-link-indicator">
                {content}
                <div style={{ position: 'fixed', bottom: theme.spacing(2), right: theme.spacing(3) }}>
                            <MuiThemeProvider theme={theme}>
              <Fab aria-label="add" color="primary" className={styles.fab}>
                <AddIcon fontSize="small" />
              </Fab>
            </MuiThemeProvider>
            </div>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true}) (RecipeSummary);

//export default withStyles(styles, { withTheme: true })(BrewDetail);