import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import ModalForm from '../Recipe/RecipeEditModalForm';
import RecipeSummaryItem from './RecipeSummaryItem';
import RecipeSummaryItemMobile from './RecipeSummaryItemMobile';
import LoadingIndicator from '../SupportComponents/LoadingIndicator';

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

function RecipeSummary(props) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [recipeAdd, setRecipeAdd] = useState();
  const [recipeType, setRecipeType] = useState();
  const [waterProfileID, setWaterProfileID] = useState();
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipeSteps, setRecipeSteps] = useState([]);
  const [recipeTypes, setRecipeTypes] = useState([]);
  const [unitsOfMeasure, setUnitsOfMeasure] = useState([]);
  const [durationTypes, setDurationTypes] = useState([]);
  const [modalShown, setModalShown] = useState(false);
  const largeScreenSize = useMediaQuery('(min-width:600px)');

  var closeButton = React.useRef();
  var modalForm = React.useRef(null);

  useEffect(() => {
    async function fetchData(baseUrl) {
    const recipesURL = `${baseUrl}recipes`;
    axios
      .get(recipesURL)
      .then((response) => response.data)
      .then((data) => {
        setRecipes(data);
      });
    
    const typeOfBeerEnumsURL = `${baseUrl}enums/ETypeOfBeer`;
    axios
      .get(typeOfBeerEnumsURL)
      .then((response) => response.data)
      .then((data) => {
        setRecipeTypes(data);
      });

    const typeOfDurationEnumsURL = `${baseUrl}enums/ETypeOfDuration`;
    var typeDurationResponse = await fetch(typeOfDurationEnumsURL);
    if (typeDurationResponse.ok) {
      var typeDurationData = await typeDurationResponse.json();
      setDurationTypes(typeDurationData);
    }

    const unitsOfMeasureEnumsURL = `${baseUrl}enums/EUnitOfMeasure`;
    var response = await fetch(unitsOfMeasureEnumsURL);
    if (response.ok)
    {
      var unitsOfMeasureData = await response.json();
      setUnitsOfMeasure(unitsOfMeasureData);
    }

    setHasLoaded(true);
  }

  fetchData(props.baseUrl);

  }, [props.baseUrl]);

  const toggleScrollLock = () => {
    document.querySelector('html').classList.toggle('scroll-lock');
  };

  const showModal = () => {
    setModalShown(true);
    toggleScrollLock();
  };

  const closeModal = () => {
    setModalShown(false);
    toggleScrollLock();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    closeModal();

    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json-patch+json');

    var rawObject = {
      Name: recipeAdd.name,
      Type: recipeType,
      Description: recipeAdd.description,
      WaterProfileID: waterProfileID,
      // Ingredients: recipeIngredients,
      ExpectedABV: recipeAdd.expectedABV,
      Steps: recipeSteps,
    };

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(rawObject),
      // redirect: 'follow',
      mode: 'cors',
    };

    let updateURL = props.baseUrl + 'recipes/';
    console.log(updateURL);

    var response = await fetch(updateURL, requestOptions);

    if (response.ok)
    {
      const recipesURL = `${props.baseUrl}recipes`;
      axios
        .get(recipesURL)
        .then((response) => response.data)
        .then((data) => {
          setRecipes(data);
      });
    }
  };

  const handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target !== null ? event.target : event.recipeTarget;

    if (name === 'waterProfile.name') {
      setWaterProfileID(value);
    // } else if (name === 'AddIngredient') {
    //   setRecipeIngredients(recipeIngredients.concat(value));
    } else if (name === 'UpdateIngredient') {
      var array = [...recipeIngredients];
      var ingredientIndex = array.findIndex((e) => e.id === value.id);

      if (ingredientIndex !== -1) {
        let editIngredient = { ...array[ingredientIndex], name: value.name, type: value.type, amount: value.amount, unit: value.unit };
        array[ingredientIndex] = editIngredient;
        setRecipeIngredients(array);
      }
    // } else if (name === 'AddStep') {
    //   setRecipeSteps(recipeSteps.concat(value));
    } else if (name === 'UpdateStep') {
      var stepArray = [...recipeSteps];
      var stepIndex = stepArray.findIndex((e) => e.id === value.id);

      if (stepIndex !== -1) {
        let editStep = { ...stepArray[stepIndex], description: value.description, timer: value.timer };
        stepArray[stepIndex] = editStep;
        setRecipeSteps(stepArray);
      }
    } else if (name === 'recipeType') {
      setRecipeType(value);
    } else {
      setRecipeAdd(prevRecipeAdd => ({
          ...prevRecipeAdd,
          [name]: value,
      }));
    }
  };

  const deleteRecipeIngredient = (ingredientID) => (event) => {
    var array = [...recipeIngredients];
    var ingredientIndex = array.findIndex((e) => e.id === ingredientID);

    if (ingredientIndex !== -1) {
      array.splice(ingredientIndex, 1);
      setRecipeIngredients(array);
    }
  };

  const addRecipeStep = (step) => {
    setRecipeSteps(recipeSteps.concat(step));
  };

  const deleteRecipeStep = (stepID) => (event) => {
    var array = [...recipeSteps];
    var stepIndex = array.findIndex((e) => e.id === stepID);

    if (stepIndex !== -1) {
      array.splice(stepIndex, 1);
      setRecipeSteps(array);
    }
  };

  const onKeyDown = (event) => {
    if (event.keyCode === 27) {
      closeModal();
    }
  };

  const addRecipe = () => {
    setRecipeAdd({
      name: '',
      description: '',
      expectedABV: 0,
      ingredients: [],
      steps: [],
    });
    setWaterProfileID('');
    setRecipeIngredients([]);
    setRecipeSteps([]);
    showModal();
  };

  return (
    <div>
      {hasLoaded ? (
        <React.Fragment>
          <div>
            {largeScreenSize ? (
              <div className="grid-brew-summary-link-indicator">
                {recipes.map((r) => (
                  <NavLink to={`/recipe/${r.id}`}>
                    <RecipeSummaryItem key={r.id} recipe={r} />
                  </NavLink>
                ))}
              </div>
            ) : (
              <div style={{ marginBottom: '56px' }}>
                <div className="grid-brew-summary-link-indicator">
                  {recipes.map((r) => (
                    <NavLink to={`/recipe/${r.id}`}>
                      <RecipeSummaryItemMobile key={r.id} recipe={r} />
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
            <div style={{ position: 'fixed', bottom: theme.spacing(2), right: theme.spacing(3) }}>
              <MuiThemeProvider theme={theme}>
                <Fab aria-label="add" color="primary" className={styles.fab} onClick={addRecipe} size="small">
                  <AddIcon fontSize="small" />
                </Fab>
              </MuiThemeProvider>
            </div>
          </div>
          {modalShown ? (
            <ModalForm
              modalRef={modalForm}
              buttonRef={closeButton}
              onSubmit={onSubmit}
              onChange={handleChange}
              onDeleteIngredient={deleteRecipeIngredient}
              onAddStep={addRecipeStep}
              onDeleteStep={deleteRecipeStep}
              closeModal={closeModal}
              onKeyDown={onKeyDown}
              recipe={recipeAdd}
              recipeTypeEnums={recipeTypes}
              unitsOfMeasure={unitsOfMeasure}
              durationTypes={durationTypes}
              baseUrl={props.baseUrl}
              title="Add Recipe"
              addingNewRecipe="true"
            />
          ) : null}
        </React.Fragment>
      ) : (
        <LoadingIndicator />
      )}
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(RecipeSummary);
