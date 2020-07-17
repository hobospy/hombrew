import React, { Component } from 'react';
import { Button, MenuItem, MenuList } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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

class AddBrew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasLoaded: false,
      selectedRecipe: -1,
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
    this.setState({ hasLoaded: true });
  }

  updateNewRecipeID = (recipeID) => (event) => {
    event.preventDefault();

    this.state.selectedRecipe = recipeID;

    this.props.onUpdateNewRecipeID(recipeID)(event);
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <div>
            <div className="brew-add-menu">
              <MenuList keepMounted>
                {this.props.recipes.map((r) => (
                  <StyledMenuItem disableGutters onClick={this.updateNewRecipeID(r.id)}>
                    <BrewAddItem key={r.id} recipe={r} />
                  </StyledMenuItem>
                ))}
              </MenuList>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {this.brewButton}
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default AddBrew;
