import React, { Component } from 'react';
import { Button, MenuItem, MenuList, TextField, createMuiTheme } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import DayjsUtils from '@date-io/dayjs';

import BrewAddItem from './BrewAddItem';

const StyledButton = withStyles({
  outlined: {
    border: '1px solid #b4b4b4',
  },
})(Button);

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: '#DFF1FF',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#001a33',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#001a33',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#001a33',
      },
    },
  },
})(TextField);

// const CssDatePicker = withStyles({

// })

const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#001a33',
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        // backgroundColor: lightBlue.A200,
        // color: "white",
      },
    },
    MuiPickersDay: {
      day: {
        color: '#001a33',
      },
      daySelected: {
        backgroundColor: '#001a33',
      },
      dayDisabled: {
        color: '#001a33',
      },
      current: {
        color: '#001a33',
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: '#001a33',
      },
    },
    MuiButton: {
      textPrimary: {
        color: '#b4b4b4',
      },
    },
  },
});

class AddBrew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasLoaded: false,
      selectedRecipe: -1,
      selectedIndex: 0,
      brewDate: new Date(),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  get brewButton() {
    return (
      <StyledButton id="submitButton" variant="outlined" onClick={this.props.onSubmit}>
        Submit
      </StyledButton>
    );
  }

  handleChange(event) {
    event.preventDefault();

    this.props.onChange(event);
  }

  handleSubmit = (event) => {
    event.preventDefault();
  };

  componentDidMount() {
    if(this.props.recipes !== undefined && this.props.recipes.length > 0)
    {
      this.props.onUpdateNewRecipeID(this.props.recipes[0].id)
    }

    this.setState({ hasLoaded: true });
  }

  updateNewRecipeID = (recipeID, index) => (event) => {
    event.preventDefault();

    this.setState({ selectedRecipe: recipeID, selectedIndex: index });

    this.props.onUpdateNewRecipeID(recipeID);//(event);
  };

  render() {
    var recipeUsed = null;
    if (this.props.brewRecipe !== undefined) {
      recipeUsed = this.props.recipes.find((element)=> {return element.name === this.props.brewRecipe});
    }

    const CssDatePicker = (props) => (
      <CssTextField
        autoComplete="off"
        fullWidth
        InputProps={{ disableUnderline: true }}
        onChange={props.onChange}
        onClick={props.onClick}
        value={props.value}
        label={props.label}
      />
    );

    return (
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <React.Fragment>
          <form onSubmit={this.handleSubmit}>
            <div>
              <div className="edit-page-container-item">
                <CssTextField
                  autoComplete="off"
                  fullWidth
                  id="name"
                  label="Name"
                  InputProps={{ disableUnderline: true }}
                  name="name"
                  onChange={this.props.onChange}
                  value={this.props.brewName}
                />
              </div>
              <div>
                <div style={{width: "50%", float: "left"}}>
                  <ThemeProvider theme={materialTheme}>
                    <DatePicker
                      fullWidth
                      format="DD/MM/YYYY"
                      id="date"
                      label="Brewing date"
                      name="date"
                      value={this.props.brewDate}
                      onChange={(date) => this.props.updateBrewDate(date)}
                      animateYearScrolling
                      TextFieldComponent={CssDatePicker}
                    />
                  </ThemeProvider>
                </div>
                <div style={{width: "50%", float: "left"}}>
                {(this.props.showActualABV !== undefined && this.props.showActualABV === true) ? (
                  <CssTextField
                    autoComplete="off"
                    fullWidth
                    id="actualABV"
                    label="Actual ABV"
                    InputProps={{ disableUnderline: true }}
                    name="actualABV"
                    onChange={this.props.onChange}
                    value={this.props.actualABV}
                  />
                ) : null }
                </div>
              </div>
              <div>
                {(this.props.brewRecipeEditable === undefined || this.props.brewRecipeEditable === true) ? (
                  <div>
                <div className="edit-page-recipe-title-container">Available recipes</div>
                <div className="brew-add-menu">
                  <MenuList>
                    {this.props.recipes.map((r, index) => (
                      <StyledMenuItem
                        disableGutters
                        onClick={this.updateNewRecipeID(r.id, index)}
                        selected={index === this.state.selectedIndex}
                      >
                        <BrewAddItem key={r.id} recipe={r} />
                      </StyledMenuItem>
                    ))}
                  </MenuList>
                </div>
                </div>
                ) : (
                  <div>
                    <div className="edit-page-recipe-title-container">Recipe used</div>
                    {recipeUsed !== null ? <BrewAddItem recipe={recipeUsed}/> : null}
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>{this.brewButton}</div>
            </div>
          </form>
        </React.Fragment>
      </MuiPickersUtilsProvider>
    );
  }
}

export default AddBrew;
