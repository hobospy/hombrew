import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import ModalForm from '../Brew/BrewAddModalForm';
import BrewSummaryItem from './BrewSummaryItem';
import BrewSummaryItemMobile from './BrewSummaryItemMobile';
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

function BrewSummary(props) {
  const [brews, setBrewValues] = useState([]);
  const largeScreenSize = useMediaQuery('(min-width:600px)');
  const [hasLoaded, setHasLoaded] = useState(false);
  const [brewAdd, setBrewAdd] = useState();
  const [modalShown, setModalShown] = useState(false);

  var closeButton = React.useRef();
  var modalForm = React.useRef(null);

  useEffect(() => {
    const url = `${props.baseUrl}brew/summary`;
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        setBrewValues(data);
        setHasLoaded(true);
      });
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
  };

  const handleChange = (event) => {
    event.preventDefault();
  };

  const addBrew = () => {
    // setBrewAdd({
    //   name: '',
    //   description: '',
    //   expectedABV: 0,
    //   ingredients: [],
    //   steps: [],
    // });
    // setWaterProfileID('');
    // setRecipeIngredients([]);
    // setRecipeSteps([]);
    showModal();
  };

  const onKeyDown = (event) => {
    if (event.keyCode === 27) {
      closeModal();
    }
  };

  return (
    <div>
      {hasLoaded ? (
        <React.Fragment>
          <div>
            {largeScreenSize ? (
              <div className="grid-brew-summary-link-indicator">
                {brews.map((b) => (
                  <NavLink to={`/brew/${b.id}`}>
                    <BrewSummaryItem key={b.id} brew={b} />
                  </NavLink>
                ))}
              </div>
            ) : (
              <div className="grid-brew-summary-link-indicator">
                {brews.map((b) => (
                  <NavLink to={`/brew/${b.id}`}>
                    <BrewSummaryItemMobile key={b.id} brew={b} />
                  </NavLink>
                ))}
              </div>
            )}
            <div style={{ position: 'fixed', bottom: theme.spacing(2), right: theme.spacing(3) }}>
              <MuiThemeProvider theme={theme}>
                <Fab aria-label="add" color="primary" className={styles.fab} onClick={addBrew} size="small">
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
              closeModal={closeModal}
              onKeyDown={onKeyDown}
              brew={brewAdd}
              baseUrl={props.baseUrl}
              title="Brew Beer"
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

export default withStyles(styles, { withTheme: true })(BrewSummary);
