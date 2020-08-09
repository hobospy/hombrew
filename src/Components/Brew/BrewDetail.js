import React, { Component } from 'react';
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
import CountdownButton from '../SupportComponents/CountdownButton';

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

class BrewDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false,
      // editMenuDisplayed: false,
      brewDetail: '',
      url: `${this.props.baseUrl}brew/${this.props.match.params.id}`,
      id: this.props.match.params.id,
      editModalShown: false,
      deleteConfirmationModalShown: false,
      brewedState: 2,
    };

    this.showDeleteModal = this.showDeleteModal.bind(this);
    this.editItem = this.editItem.bind(this);
    this.showBrewing = this.showBrewing.bind(this);
  }

  componentDidMount() {
    console.log(this.state.url);
    axios
      .get(this.state.url)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ brewDetail: data });
        this.setState({ hasLoaded: true });
      });
  }

  // displayEditMenu = () => {
  //   return this.setState({ editMenuDisplayed: !this.state.editMenuDisplayed });
  // };

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

  toggleScrollLock = () => {
    document.querySelector('html').classList.toggle('scroll-lock');
  };

  editItem = () => {
    this.setState({
      brewEdit: this.state.brewDetail,
    });
    this.showEditModal();
  };

  showBrewing = () => {
    alert('Show brewing page');
  };

  render() {
    const brew = this.state.brewDetail;

    return (
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <div className="grid-brewed-detail">
          {this.state.hasLoaded ? (
            <React.Fragment>
              <div>
                <BrewDetailTitleArea brewDetail={brew} url={this.state.url} />
                {this.state.brewedState !== 1 ? (
                  <CollapsiblePanel
                    title={'Recipe - ' + brew.recipe.name}
                    children={<BrewDetailRecipe recipe={brew.recipe} detailsExpanded={false} hideBrewingSteps={false} />}
                    open={false}
                  />
                ) : (
                  <BrewDetailBrewingSummary steps={brew.recipe.steps} notes={brew.brewingNotes} />
                )}
                {this.state.brewedState === 2 ? (
                  <div>
                    <BrewDetailBrewedNotes baseUrl={this.props.baseUrl} brewDetail={brew} url={this.state.url} />
                    <BrewDetailTastingNotes baseUrl={this.props.baseUrl} brewDetail={brew} url={this.state.url} />
                  </div>
                ) : null}
                <div style={{ position: 'fixed', bottom: '5px', right: '15px' }}>
                  <EditSpeedDial editItemAction={this.editItem} deleteItemAction={this.showDeleteModal} startBrewingAction={this.showBrewing} />
                </div>
              </div>
              {this.state.editModalShown ? (
                <BrewEditModalForm
                  modalRef={(n) => (this.modalEditForm = n)}
                  buttonRef={(n) => (this.closeEditButton = n)}
                  // onSubmit={this.onSubmit}
                  // onChange={this.handleChange}
                  closeModal={this.closeEditModal}
                  onKeyDown={this.onKeyDown}
                  baseUrl={this.props.baseUrl}
                  title="Edit Brew"
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
                  confirmationMessage={'Are you sure you want to delete the ' + this.state.brewDetail.name + ' brew?'}
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
}

export default withStyles(styles, { withTheme: true })(BrewDetail);
