import React, { Component } from 'react';
import axios from 'axios';
import FloatingLabelInput from 'react-floating-label-input';

import BrewDetailRecipe from '../Brew/BrewDetailRecipe';
import EditSpeedDial from '../../SupportFunctions/EditSpeedDial';
import Favourite from '../../SupportFunctions/Favourite';
import RecipeEditModalForm from './RecipeEditModalForm';
import ConfirmationModalForm from '../SupportComponents/ConfirmationModalForm';
import LoadingIndicator from '../SupportComponents/LoadingIndicator';

class RecipeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false,
      recipeDetail: '',
      recipeEdit: '',
      recipeTypeEdit: '',
      waterProfileID: '',
      recipeIngredients: [],
      recipeSteps: [],
      url: `${this.props.baseUrl}recipe/${this.props.match.params.id}`,
      id: this.props.match.params.id,
      editModalShown: false,
      deleteConfirmationModalShown: false,
      errorModalShown: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateFavourite = this.updateFavourite.bind(this);
    this.editItem = this.editItem.bind(this);
    this.showDeleteModal = this.showDeleteModal.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.showErrorModal = this.showErrorModal.bind(this);

    this.deleteRecipeIngredient = this.deleteRecipeIngredient.bind(this);
    this.addRecipeStep = this.addRecipeStep.bind(this);
    this.updateRecipeStep = this.updateRecipeStep.bind(this);
    this.deleteRecipeStep = this.deleteRecipeStep.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    console.log(this.state.url);
    axios
      .get(this.state.url)
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          recipeDetail: data,
          recipeTypeEdit: data.type,
          waterProfileID: data.waterProfile.id,
          recipeSteps: data.steps,
          hasLoaded: true,
        });
      });
  }

  updateFavourite = async (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json-patch+json');

    var data = [
      {
        op: 'replace',
        path: '/Favourite',
        value: !this.state.recipeDetail.favourite,
      },
    ];
    var raw = JSON.stringify(data);

    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(this.state.url, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          recipeDetail: response,
        });
      });
  };

  showEditModal = () => {
    this.setState({ editModalShown: true }, () => {
      this.closeEditButton.focus();
    });

    this.toggleScrollLock();
  };

  closeEditModal = () => {
    this.setState({ editModalShown: false });
    this.toggleScrollLock();
  };

  showDeleteModal = () => {
    this.setState({ deleteConfirmationModalShown: true }, () => {
      this.closeDeleteConfirmationButton.focus();
    });

    this.toggleScrollLock();
  };

  closeDeleteModal = () => {
    this.setState({ deleteConfirmationModalShown: false });
    this.toggleScrollLock();
  };

  showErrorModal = () => {
    this.setState({ errorModalShown: true }, () => {
      this.closeErrorButton.focus();
    });

    this.toggleScrollLock();
  };

  closeErrorModal = () => {
    this.setState({ errorModalShown: false });
    this.toggleScrollLock();
  };

  onKeyDown = (event) => {
    if (event.keyCode === 27) {
      this.closeEditModal();
      console.log(this.state.waterProfileID);
    }
  };

  handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

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
      this.setState({ recipeTypeEdit: value });
    } else {
      this.setState((prevState) => ({
        recipeEdit: {
          ...prevState.recipeEdit,
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

  addRecipeStep(newStepItem) {
    this.setState({ recipeSteps: this.state.recipeSteps.concat(newStepItem) });
  }

  updateRecipeStep(updatedStepItem) {
    var stepArray = [...this.state.recipeSteps];
    var stepIndex = stepArray.findIndex((e) => e.id === updatedStepItem.id);

    if (stepIndex !== -1) {
      let editStep = {
        ...stepArray[stepIndex],
        description: updatedStepItem.description,
        timer: updatedStepItem.timer,
        ingredients: updatedStepItem.ingredients,
      };
      stepArray[stepIndex] = editStep;
      this.setState({ recipeSteps: stepArray });
    }
  }

  deleteRecipeStep = (stepID) => (event) => {
    var array = [...this.state.recipeSteps];
    var stepIndex = array.findIndex((e) => e.id === stepID);

    if (stepIndex !== -1) {
      array.splice(stepIndex, 1);
      this.setState({ recipeSteps: array });
    }
  };

  onSubmit = (event) => {
    event.preventDefault();

    this.closeEditModal();

    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json-patch+json');

    var rawObject = {
      Name: this.state.recipeEdit.name,
      Type: this.state.recipeTypeEdit,
      Description: this.state.recipeEdit.description,
      WaterProfileID: this.state.waterProfileID,
      ExpectedABV: this.state.recipeEdit.expectedABV,
      Steps: this.state.recipeSteps,
    };

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(rawObject),
      redirect: 'follow',
      mode: 'cors',
    };

    fetch(this.state.url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ recipeDetail: data, recipeSteps: data.steps });
      });
  };

  onClickOutside = (event) => {
    if (this.modalEditForm && this.modalEditForm.contains(event.target)) {
      // return;
    } else {
      this.closeEditModal();
    }
  };

  toggleScrollLock = () => {
    document.querySelector('html').classList.toggle('scroll-lock');
  };

  editItem() {
    this.setState({
      recipeEdit: this.state.recipeDetail,
    });
    this.showEditModal();
  }

  async deleteRecipe() {
    this.closeDeleteModal();

    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json-patch+json');

    var rawObject = '';

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: JSON.stringify(rawObject),
      redirect: 'follow',
      mode: 'cors',
    };

    var response = await fetch(this.state.url, requestOptions);
    if (response.ok) {
      this.props.history.push('/recipe/summary');
    } else {
      this.showErrorModal();
    }
  }

  render() {
    const recipe = this.state.recipeDetail;

    return (
      <div className="recipe-detail">
        {this.state.hasLoaded ? (
          <React.Fragment>
            <div>
              <div className="recipe-detail-title-container">
                <div className="recipe-detail-title">
                  <FloatingLabelInput id="recipe-name" label="Name" value={recipe.name} />
                </div>
                <div className="recipe-detail-favourite" onClick={this.updateFavourite}>
                  <Favourite favourite={recipe.favourite} />
                </div>
              </div>
              <BrewDetailRecipe recipe={recipe} detailsExpanded={true} hideBrewingSteps={false} />
              <div style={{ position: 'fixed', bottom: '5px', right: '15px' }}>
                <EditSpeedDial editItemAction={this.editItem} deleteItemAction={this.showDeleteModal} />
              </div>
            </div>
            {this.state.editModalShown ? (
              <RecipeEditModalForm
                modalRef={(n) => (this.modalEditForm = n)}
                buttonRef={(n) => (this.closeEditButton = n)}
                onSubmit={this.onSubmit}
                onChange={this.handleChange}
                onDeleteIngredient={this.deleteRecipeIngredient}
                onAddStep={this.addRecipeStep}
                onUpdateStep={this.updateRecipeStep}
                onDeleteStep={this.deleteRecipeStep}
                closeModal={this.closeEditModal}
                onKeyDown={this.onKeyDown}
                recipe={this.state.recipeEdit}
                baseUrl={this.props.baseUrl}
                title="Edit Recipe"
                addingNewRecipe="false"
              />
            ) : null}
            {this.state.deleteConfirmationModalShown ? (
              <ConfirmationModalForm
                modalRef={(n) => (this.modalDeleteConfirmationForm = n)}
                buttonRef={(n) => (this.closeDeleteConfirmationButton = n)}
                onOK={this.deleteRecipe}
                closeModal={this.closeDeleteModal}
                onKeyDown={this.onKeyDown}
                confirmationMessage={'Are you sure you want to delete the ' + this.state.recipeDetail.name + ' recipe?'}
                title="Delete Recipe"
                showCancel="true"
              />
            ) : null}
            {this.state.errorModalShown ? (
              <ConfirmationModalForm
                modalRef={(n) => (this.modalErrorForm = n)}
                buttonRef={(n) => (this.closeErrorButton = n)}
                onOK={this.closeErrorModal}
                closeModal={this.closeErrorModal}
                onKeyDown={this.onKeyDown}
                confirmationMessage={'There has been an unknown error whilst deleting the ' + this.state.recipeDetail.name + ' recipe'}
                title="Delete Recipe Error"
                showCancel="false"
              />
            ) : null}
          </React.Fragment>
        ) : (
          <LoadingIndicator />
        )}
      </div>
    );
  }
}

export default RecipeDetail;
