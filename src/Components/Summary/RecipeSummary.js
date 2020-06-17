import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import ModalForm from '../Recipe/RecipeEditModalForm';
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

class RecipeSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false,
      url: props.baseUrl,
      recipes: [],
      recipeAdd: '',
      recipeType: '',
      waterProfileID: '',
      recipeIngredients: [],
      recipeSteps: [],
      modalShown: false,
    };

    this.addRecipe = this.addRecipe.bind(this);
  }

  componentDidMount() {
    const url = `${this.state.url}recipe/summary`;
    console.log(url);
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        console.log('DATA: ' + data);
        this.setState({ recipes: data });
        this.setState({ hasLoaded: true });
        console.log(this.state.recipes);
      });
  }

  toggleScrollLock = () => {
    document.querySelector('html').classList.toggle('scroll-lock');
  };

  showModal = () => {
    this.setState({ modalShown: true }, () => {
      this.closeButton.focus();
    });

    this.toggleScrollLock();
  };

  closeModal = () => {
    this.setState({ modalShown: false });
    this.toggleScrollLock();
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.closeModal();

    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json-patch+json');

    var rawObject = {
      Name: this.state.recipeAdd.name,
      Type: this.state.recipeType,
      Description: this.state.recipeAdd.description,
      WaterProfileID: this.state.waterProfileID,
      Ingredients: this.state.recipeIngredients,
      ExpectedABV: this.state.recipeAdd.expectedABV,
      Steps: this.state.recipeSteps,
    };

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(rawObject),
      redirect: 'follow',
      mode: 'cors',
    };

    let updateURL = this.state.url + 'recipe/';
    console.log(updateURL);

    fetch(updateURL, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ recipes: this.state.recipes.concat(data) });
      });
  };

  handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target !== null ? event.target : event.recipeTarget;

    if (name === 'waterProfile.name') {
      this.setState({ waterProfileID: value });
    } else if (name === 'AddIngredient') {
      this.setState({ recipeIngredients: this.state.recipeIngredients.concat(value) });
    } else if (name === 'UpdateIngredient') {
      var array = [...this.state.recipeIngredients];
      var ingredientIndex = array.findIndex((e) => e.id === value.id);

      if (ingredientIndex !== -1) {
        let editIngredient = { ...array[ingredientIndex], name: value.name, type: value.type, amount: value.amount, unit: value.unit };
        array[ingredientIndex] = editIngredient;
        this.setState({ recipeIngredients: array });
      }
    } else if (name === 'AddStep') {
      this.setState({ recipeSteps: this.state.recipeSteps.concat(value) });
    } else if (name === 'UpdateStep') {
      var stepArray = [...this.state.recipeSteps];
      var stepIndex = stepArray.findIndex((e) => e.id === value.id);

      if (stepIndex !== -1) {
        let editStep = { ...stepArray[stepIndex], description: value.description, timer: value.timer };
        stepArray[stepIndex] = editStep;
        this.setState({ recipeSteps: stepArray });
      }
    } else if (name === 'recipeType') {
      this.setState({ recipeType: value });
    } else {
      this.setState((prevState) => ({
        recipeAdd: {
          ...prevState.recipeAdd,
          [name]: value,
        },
      }));
    }
  };

  deleteRecipeIngredient = (ingredientID) => (event) => {
    var array = [...this.state.recipeIngredients];
    var ingredientIndex = array.findIndex((e) => e.id === ingredientID);

    if (ingredientIndex !== -1) {
      array.splice(ingredientIndex, 1);
      this.setState({ recipeIngredients: array });
    }
  };

  deleteRecipeStep = (stepID) => (event) => {
    var array = [...this.state.recipeSteps];
    var stepIndex = array.findIndex((e) => e.id === stepID);

    if (stepIndex !== -1) {
      array.splice(stepIndex, 1);
      this.setState({ recipeSteps: array });
    }
  };

  onKeyDown = (event) => {
    if (event.keyCode === 27) {
      this.closeModal();
      console.log(this.state.waterProfileID);
    }
  };

  addRecipe() {
    this.setState({
      recipeAdd: {
        name: '',
        description: '',
        expectedABV: 0,
        ingredients: [],
        steps: [],
      },
      recipeTypeEdit: '',
      waterProfileID: '',
      recipeIngredients: [],
      recipeSteps: [],
    });
    this.showModal();
  }

  render() {
    let content;

    content = this.state.recipes.map((r) => (
      <NavLink to={`/recipe/${r.id}`}>
        <RecipeSummaryItem key={r.id} recipe={r} />
      </NavLink>
    ));

    return (
      <React.Fragment>
        <div className="grid-brew-summary-link-indicator">
          {content}
          <div style={{ position: 'fixed', bottom: theme.spacing(2), right: theme.spacing(3) }}>
            <MuiThemeProvider theme={theme}>
              <Fab aria-label="add" color="primary" className={styles.fab} onClick={this.addRecipe}>
                <AddIcon fontSize="small" />
              </Fab>
            </MuiThemeProvider>
          </div>
        </div>
        {this.state.modalShown ? (
          <ModalForm
            modalRef={(n) => (this.ModalForm = n)}
            buttonRef={(n) => (this.closeButton = n)}
            onSubmit={this.onSubmit}
            onChange={this.handleChange}
            onDeleteIngredient={this.deleteRecipeIngredient}
            onDeleteStep={this.deleteRecipeStep}
            closeModal={this.closeModal}
            onKeyDown={this.onKeyDown}
            recipe={this.state.recipeAdd}
            baseUrl={this.props.baseUrl}
            title="Add Recipe"
            addingNewRecipe="true"
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(RecipeSummary);
