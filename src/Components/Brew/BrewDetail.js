import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';

import BrewDetailBrewedNotes from './BrewDetailBrewedNotes';
import BrewDetailTastingNotes from './BrewDetailTastingNotes';
import BrewDetailRecipe from './BrewDetailRecipe';
import BrewDetailTitleArea from './BrewDetailTitleArea';

// TODO: CAN WE COMBINE THIS WITH THE ADD BREW MODAL FORM?
// NEED TO HANDLE THE VARIOUS BREWED STATES, HIDE THE RECIPE LIST - STILL THINK THE DATE SHOULD BE EDITABLE?
// OR SHOULD THIS BE HANDLED WHEN YOU START BREWING?
import BrewEditModalForm from './BrewEditModalForm';
import BrewDetailBrewingSummary from './BrewDetailBrewingSummary';
import CollapsiblePanel from '../SupportComponents/CollapsiblePanel';
import ConfirmationModalForm from '../SupportComponents/ConfirmationModalForm';
import EditSpeedDial from '../../SupportFunctions/EditSpeedDial';
import LoadingIndicator from '../SupportComponents/LoadingIndicator';
import { useHistory, Redirect } from 'react-router-dom';

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

function BrewDetail(props) {

  const history = useHistory();

  const[hasLoaded, setHasLoaded] = useState(false);
  const[brewDetail, setBrewDetail] = useState('');
  const[editBrewDetail, setEditBrewDetail] = useState('');
  const[updateDetails, setUpdateDetails] = useState([]);
  const[editModalShown, setEditModalShown] = useState(false);
  const[deleteConfirmationModalShown, setDeleteConfirmationModalShown] = useState(false);
  const[brewedState, setBrewedState] = useState(0);
  const[unitTypes, setUnitTypes] = useState([]);
  const url = `${props.baseUrl}brews/${props.match.params.id}`;
  const fullURL = `${props.baseUrl}brews/${props.match.params.id}?IncludeAdditionalInfo=true`;
  const id = props.match.params.id;

  // useEffect( async () => {
  //   console.log(fullURL);
  //   var response = await axios.get(fullURL);
  //   setBrewDetail(response.data);
  //   setBrewedState(response.data.brewedState);
    
  //   var unitUrl = `${props.baseUrl}enums/EUnitOfMeasure`;
  //   var unitResponse = await axios.get(unitUrl);
  //   setUnitTypes(unitResponse.data);
  //   setHasLoaded(true);
  // }, [])

  useEffect(() => {
    async function fetchDetails() {
      console.log(fullURL);
      var response = await axios.get(fullURL);
      setBrewDetail(response.data);
      setBrewedState(response.data.brewedState);
      
      var unitUrl = `${props.baseUrl}enums/EUnitOfMeasure`;
      var unitResponse = await axios.get(unitUrl);
      setUnitTypes(unitResponse.data);
      setHasLoaded(true);
    }

    fetchDetails()
  }, [])

  const showEditModal = () => {
    setEditBrewDetail(brewDetail);
    setEditModalShown(true);

    toggleScrollLock();
  };

  const closeEditModal = () => {
    setEditModalShown(false);
    toggleScrollLock();
  };

  const showDeleteModal = () => {
    setDeleteConfirmationModalShown(true);

    // this.setState({ deleteConfirmationModalShown: true }, () => {
    //   this.closeDeleteConfirmationButton.focus();
    // });

    toggleScrollLock();
  };

  const showErrorModal = () => {

  }

  const closeDeleteModal = () => {
    setDeleteConfirmationModalShown(false);
    toggleScrollLock();
  };

  const DeleteBrew = async () => {
    closeDeleteModal();

    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'text/plain');

    var rawObject = '';

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: JSON.stringify(rawObject),
      redirect: 'follow',
      mode: 'cors',
    };

    var response = await fetch(fullURL, requestOptions);
    if (response.ok) {
      //history.push("/brew/summary/");
      //history.goBack();
      //setBrewDeleted(true);
      //useHistory().replace('/brew/summary');
      //props.history.push('/brew/summary');
      props.history.push('/brew/summary/');
    } else {
      showErrorModal();
    }
  }

  // useEffect(() => {
  //   useHistory().replace('/brew/summary');
  // }, [brewDeleted])

  const toggleScrollLock = () => {
    document.querySelector('html').classList.toggle('scroll-lock');
  };

  const editItem = () => {
    setEditBrewDetail(brewDetail);
    showEditModal();
  };

  const handleChange = (event) => {
    if (event.defaultPrevented !== undefined)
    {
      event.preventDefault();
    }

    const { name, value } = event.target;

    setEditBrewDetail({...editBrewDetail, [name]: value});
    updatePatchDetails(name, value);
  };

  const updateBrewDate = (newDate) => {
    const brewDatePropName = "brewDate";
    const updatedBrewDate = newDate.toDate();
    setEditBrewDetail({...editBrewDetail, [brewDatePropName]: updatedBrewDate});

    updatePatchDetails(brewDatePropName, updatedBrewDate);
  };

  const updatePatchDetails = (name, value) => {

    let listUpdated = false;
    let updatedUpdateDetails = updateDetails.map(item =>
      {
        if (item.name === name) {
          listUpdated = true;
          return {...item, value: value};
        }

        return item;
      });

    if (listUpdated) {
      setUpdateDetails(updatedUpdateDetails);
    }
    else {
      setUpdateDetails(updateDetails => [...updateDetails, { "name": name, "value": value} ] );
    }
  };

  const onSubmit = async () => {
    if (updateDetails !== undefined && updateDetails.length > 0)
    {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json-patch+json');

      var patchData = [];
      updateDetails.forEach(function (arrayItem){
        patchData.push(
          {
            op: 'replace',
            path: arrayItem.name,
            value: arrayItem.value,
          }
        );
      });
      var rawData = JSON.stringify(patchData);

      var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: rawData,
        redirect: 'follow',
      };

      var response = await fetch(url, requestOptions);
      if (response.ok) {
        if (response.json.length > 0) {
          var data = await response.json();
          setBrewDetail(data);
          // this.setState({
          //   brewDetail: data,
          //   brewedState: data.brewedState,
          // });
        }
        else {
          //setBrewDetail({...editBrewDetail});
          setBrewDetail({...editBrewDetail});
          // var updatedBrewDetail = brewDetail;
          // updatedBrewDetail.brewedState = updatedBrewState;

          // this.setState({
          //   brewDetail: updatedBrewDetail,
          //   brewedState: updatedBrewState,
          // })
        }
      }
    }

    //setEditModalShown(false);
    closeEditModal();
  };

  const startBrewing = async () => {
    var updatedBrewState = 1;
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json-patch+json');

    var data = [
      {
        op: 'replace',
        path: '/BrewedState',
        value: updatedBrewState,
      },
    ];
    var raw = JSON.stringify(data);

    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    var response = await fetch(url, requestOptions);
    if (response.ok) {
      if (response.json.length > 0) {
        var data = await response.json();
        setBrewDetail(data);
        setBrewedState(data.brewedState);
      }
      else {
        var updatedBrewDetail = brewDetail;
        updatedBrewDetail.brewedState = updatedBrewState;

        setBrewDetail(updatedBrewDetail);
        setBrewedState(updatedBrewState);
      }
    }
  };

  const showBrewing = () => {
    return brewedState === 0;
  };

    return (
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <div className="grid-brewed-detail">
          {hasLoaded ? (
            <React.Fragment>
              <div>
                <BrewDetailTitleArea brewDetail={brewDetail} url={url} />
                {brewedState !== 1 ? (
                  <CollapsiblePanel
                    title={'Recipe - ' + brewDetail.recipe.name}
                    children={<BrewDetailRecipe
                                recipe={brewDetail.recipe}
                                detailsExpanded={false}
                                hideBrewingSteps={false}
                                unitTypes={unitTypes}
                              />}
                    open={brewedState === 0}
                  />
                ) : (
                  <BrewDetailBrewingSummary steps={brewDetail.recipe.steps} brewingNotes={brewDetail.brewingNotes} />
                )}
                {brewedState === 2 ? (
                  <div>
                    <BrewDetailBrewedNotes baseUrl={props.baseUrl} brewingNotes={brewDetail.brewingNotes} url={fullURL} />
                    <BrewDetailTastingNotes baseUrl={props.baseUrl} brewDetail={brewDetail} url={url} />
                  </div>
                ) : null}
                <div style={{ position: 'fixed', bottom: '5px', right: '15px' }}>
                  <EditSpeedDial
                    editItemAction={editItem}
                    deleteItemAction={showDeleteModal}
                    startBrewingAction={startBrewing}
                    showBrewingAction={showBrewing()}
                  />
                </div>
              </div>
              {editModalShown ? (
                <BrewEditModalForm
                  // modalRef={(n) => (modalEditForm = n)}
                  // buttonRef={(n) => (closeEditButton = n)}
                  onSubmit={onSubmit}
                  onChange={handleChange}
                  closeModal={closeEditModal}
                  // onKeyDown={onKeyDown}
                  baseUrl={props.baseUrl}
                  title="Edit Brew"
                  addingNewRecipe="false"
                  brewName={editBrewDetail.name}
                  brewDate={editBrewDetail.brewDate}
                  brewedState={editBrewDetail.brewedState}
                  actualABV={editBrewDetail.abv}
                  brewRecipe={editBrewDetail.recipe.name}
                  updateBrewDate={updateBrewDate}
                />
              ) : null}
              {deleteConfirmationModalShown ? (
                <ConfirmationModalForm
                  // modalRef={(n) => (modalDeleteConfirmationForm = n)}
                  // buttonRef={(n) => (closeDeleteConfirmationButton = n)}
                  onOK={DeleteBrew}
                  closeModal={closeDeleteModal}
                  // onKeyDown={onKeyDown}
                  confirmationMessage={'Are you sure you want to delete the ' + brewDetail.name + ' brew?'}
                  title="Delete Brew"
                  showCancel="true"
                />
              ) : null}
            </React.Fragment>
          ) : (
            <LoadingIndicator />
          )}
        </div>
      </MuiPickersUtilsProvider>
    );
}

export default withStyles(styles, { withTheme: true })(BrewDetail);
