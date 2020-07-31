import React, { Component } from 'react';
import axios from 'axios';
import FloatingLabelInput from 'react-floating-label-input';
import moment from 'moment';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import { TextField, createMuiTheme } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';
import dayjs from 'dayjs';

import blankBeerPhoto from '../../resources/BeerPhotoUnloaded.png';
import BrewDetailBrewedNotes from './BrewDetailBrewedNotes';
import BrewDetailRecipe from './BrewDetailRecipe';
import BrewDetailTitleArea from './BrewDetailTitleArea';
import CollapsiblePanel from '../SupportComponents/CollapsiblePanel';
import ConfirmationModalForm from '../SupportComponents/ConfirmationModalForm';
import EditSpeedDial from '../../SupportFunctions/EditSpeedDial';
import LoadingIndicator from '../SupportComponents/LoadingIndicator';
import CountdownButton from '../SupportComponents/CountdownButton';

const StyledRating = withStyles({
  iconFilled: {
    color: '#001A33',
  },
  iconHover: {
    color: '#001A33',
  },
})(Rating);

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

const CSSButton = withStyles({
  root: {
    border: '1px solid #b4b4b4',
    background: '#b4b4b4',
    color: '#001a33',
    height: '32px',
    width: '32px',
    minwidth: '32px',
    '&:hover': {
      background: '#001a33',
      color: '#b4b4b4',
    },
  },
})(Button);

const StyledButton = withStyles({
  outlined: {
    border: '1px solid #b4b4b4',
    margin: '0px 0px 0px 10px',
  },
})(Button);

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

const CSSIconButton = withStyles({
  root: {
    color: '#001a33',
    height: '32px',
    width: '32px',
    '&:hover': {
      background: '#b4b4b4',
    },
  },
})(IconButton);

class BrewDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false,
      // editMenuDisplayed: false,
      brewDetail: '',
      brewEdit: '',
      url: `${this.props.baseUrl}brew/${this.props.match.params.id}`,
      id: this.props.match.params.id,
      editModalShown: false,
      editBrewingNotes: false,
      editableBrewingNotes: '',
      deleteConfirmationModalShown: false,
      addNote: false,
      newTastingNoteDetails: '',
      newTastingNoteDate: dayjs(),
      deleteTastingNoteID: '',
      deleteTastingNote: '',
      deleteTastingNoteDate: '',
      deleteTastingNoteConfirmationModalShown: false,
      editTastingNoteID: '',
      editTastingNote: '',
      editTastingNoteDate: '',
      editingTastingNote: false,
      tastingNotes: [],
      brewedState: 0,
    };

    this.editItem = this.editItem.bind(this);
    this.showAddTastingNote = this.showAddTastingNote.bind(this);
    this.hideAddTastingNote = this.hideAddTastingNote.bind(this);
    this.addNewTastingNote = this.addNewTastingNote.bind(this);
    this.deleteTastingNote = this.deleteTastingNote.bind(this);
    this.showDeleteTastingNoteModal = this.showDeleteTastingNoteModal.bind(this);
    this.closeDeleteTastingNoteModal = this.closeDeleteTastingNoteModal.bind(this);
    this.displayEditBrewingNotes = this.displayEditBrewingNotes.bind(this);
    this.hideBrewingNoteButtons = this.hideBrewingNoteButtons.bind(this);
    this.updateBrewingNotes = this.updateBrewingNotes.bind(this);
    this.onUpdateTastingNote = this.onUpdateTastingNote.bind(this);
    this.editTastingNote = this.editTastingNote.bind(this);
    this.cancelEditTastingNote = this.cancelEditTastingNote.bind(this);
  }

  componentDidMount() {
    console.log(this.state.url);
    axios
      .get(this.state.url)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ brewDetail: data });
        this.setState({ editableBrewingNotes: data.brewingNotes });
        this.setState({ hasLoaded: true });

        var tastingNoteList = [];
        if (data.tastingNotes !== undefined) {
          data.tastingNotes.forEach(function (arrayItem) {
            const obj = {
              id: arrayItem.id,
              note: arrayItem.note,
              date: arrayItem.date,
              brewID: arrayItem.brewID,
              inEdit: false,
            };

            tastingNoteList.push(obj);
          });
        }

        tastingNoteList.sort(function compare(a, b) {
          var dateA = new Date(a.date);
          var dateB = new Date(b.date);

          return dateA - dateB;
        });

        this.setState({ tastingNotes: tastingNoteList });
      });
  }

  // displayEditMenu = () => {
  //   return this.setState({ editMenuDisplayed: !this.state.editMenuDisplayed });
  // };

  displayEditBrewingNotes = () => {
    this.setState({ editBrewingNotes: true });
  };

  hideBrewingNoteButtons = () => {
    this.setState({ editableBrewingNotes: this.state.brewDetail.brewingNotes === null ? '' : this.state.brewDetail.brewingNotes });
    this.setState({ editBrewingNotes: false });
  };

  editTastingNote = (tastingNoteID) => (event) => {
    var array = [...this.state.tastingNotes];
    var tastingNoteIndex = array.findIndex((e) => e.id === tastingNoteID);

    if (tastingNoteIndex !== -1) {
      let editTastingNote = { ...array[tastingNoteIndex], inEdit: true };
      array[tastingNoteIndex] = editTastingNote;

      this.setState({ editTastingNote: editTastingNote.note });
      this.setState({ editTastingNoteDate: editTastingNote.date });
      this.setState({ editTastingNoteID: editTastingNote.id });

      this.setState({ tastingNotes: array });
      this.setState({ editingTastingNote: true });
    }
  };

  cancelEditTastingNote = (tastingNoteID) => (event) => {
    var array = [...this.state.tastingNotes];
    var tastingNoteIndex = array.findIndex((e) => e.id === tastingNoteID);

    if (tastingNoteIndex !== -1) {
      let editTastingNote = { ...array[tastingNoteIndex], inEdit: false };
      array[tastingNoteIndex] = editTastingNote;

      this.setState({ editTastingNote: '' });
      this.setState({ editTastingNoteDate: '' });
      this.setState({ editTastingNoteID: '' });

      this.setState({ tastingNotes: array });
      this.setState({ editingTastingNote: false });
    }
  };

  updateBrewingNotes() {
    this.setState({ editBrewingNotes: false });

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json-patch+json');

    var rawObject = [
      {
        op: 'replace',
        path: '/BrewingNotes',
        value: this.state.editableBrewingNotes,
      },
    ];

    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: JSON.stringify(rawObject),
      redirect: 'follow',
    };

    var response = fetch(this.state.url, requestOptions);
    if (response.ok) {
      var data = response.json();
      this.setState({
        brewDetail: data,
      });
    }
  }

  async onUpdateTastingNote() {
    this.setState({ editingTastingNote: false });

    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json-patch+json');

    var rawObject = {
      Note: this.state.editTastingNote,
      Date: this.state.editTastingNoteDate,
      BrewID: this.state.brewDetail.id,
    };

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(rawObject),
      redirect: 'follow',
      mode: 'cors',
    };

    var updatedBrewDetail = this.state.brewDetail;

    var updateTastingNoteURL = `${this.props.baseUrl}tastingNote/` + this.state.editTastingNoteID;
    var response = await fetch(updateTastingNoteURL, requestOptions);
    if (response.ok) {
      var data = await response.json();
      if (data !== null) {
        var array = updatedBrewDetail.tastingNotes;
        var tastingNoteIndex = array.findIndex((e) => e.id === this.state.editTastingNoteID);

        if (tastingNoteIndex !== -1) {
          array[tastingNoteIndex].note = data.note;
          array[tastingNoteIndex].date = data.date;
        }

        updatedBrewDetail.tastingNotes = array;

        this.setState({ brewDetail: updatedBrewDetail });
        this.setState({ editTastingNote: '' });
        this.setState({ editTastingNoteDate: '' });
        this.setState({ editTastingNoteID: '' });

        var tastingNoteList = [];
        if (array !== undefined) {
          array.forEach(function (arrayItem) {
            const obj = {
              id: arrayItem.id,
              note: arrayItem.note,
              date: arrayItem.date,
              brewID: arrayItem.brewID,
              inEdit: false,
            };

            tastingNoteList.push(obj);
          });
        }

        tastingNoteList.sort(function compare(a, b) {
          var dateA = new Date(a.date);
          var dateB = new Date(b.date);

          return dateA - dateB;
        });

        this.setState({ tastingNotes: tastingNoteList });
      } else {
        console.log('Error in response: ');
      }
    }
    // });
  }

  showDeleteTastingNoteModal = (tastingNoteID) => (event) => {
    var array = [...this.state.brewDetail.tastingNotes];
    var tastingNoteIndex = array.findIndex((e) => e.id === tastingNoteID);

    if (tastingNoteIndex !== -1) {
      this.setState({ deleteTastingNote: array[tastingNoteIndex].note });
      this.setState({ deleteTastingNoteDate: array[tastingNoteIndex].date });
      this.setState({ deleteTastingNoteID: tastingNoteID });
      this.setState({ deleteTastingNoteConfirmationModalShown: true }, () => {
        this.closeDeleteConfirmationButton.focus();
      });

      this.toggleScrollLock();
    }
  };

  closeDeleteTastingNoteModal = () => {
    this.setState({ deleteTastingNoteConfirmationModalShown: false });
    this.toggleScrollLock();
  };

  showAddTastingNote = () => {
    this.setState({ newTastingNoteDetails: '' });
    this.setState({ newTastingNoteDate: dayjs() });
    this.setState({ addNote: true });
  };

  hideAddTastingNote = () => {
    this.setState({ addNote: false });
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

  toggleScrollLock = () => {
    document.querySelector('html').classList.toggle('scroll-lock');
  };

  editItem() {
    this.setState({
      brewEdit: this.state.brewDetail,
    });
    this.showEditModal();
  }

  addNewTastingNote() {
    this.hideAddTastingNote();

    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json-patch+json');

    var rawObject = {
      Note: this.state.newTastingNoteDetails,
      Date: this.state.newTastingNoteDate,
      BrewID: this.state.id,
    };

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(rawObject),
      redirect: 'follow',
      mode: 'cors',
    };

    var updatedBrewDetail = this.state.brewDetail;

    fetch(`${this.props.baseUrl}tastingNote/`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data !== null) {
          var newTastingNotes = updatedBrewDetail.tastingNotes.slice();
          newTastingNotes.push(data);
          updatedBrewDetail.tastingNotes = newTastingNotes;

          this.setState({ brewDetail: updatedBrewDetail });
          this.setState({ newTastingNoteDetails: '' });
          this.setState({ newTastingNoteDate: dayjs() });

          var tastingNoteList = [];
          if (newTastingNotes !== undefined) {
            newTastingNotes.forEach(function (arrayItem) {
              const obj = {
                id: arrayItem.id,
                note: arrayItem.note,
                date: arrayItem.date,
                brewID: arrayItem.brewID,
                inEdit: false,
              };

              tastingNoteList.push(obj);
            });
          }

          tastingNoteList.sort(function compare(a, b) {
            var dateA = new Date(a.date);
            var dateB = new Date(b.date);

            return dateA - dateB;
          });

          this.setState({ tastingNotes: tastingNoteList });
        } else {
          console.log('Error in response: ');
        }
      });
  }

  async deleteTastingNote() {
    this.closeDeleteTastingNoteModal();

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

    var deleteURL = `${this.props.baseUrl}tastingNote/` + this.state.deleteTastingNoteID;
    var response = await fetch(deleteURL, requestOptions);
    if (response.ok) {
      var updatedBrewDetail = this.state.brewDetail;
      var newTastingNotes = updatedBrewDetail.tastingNotes;
      var tastingNoteIndex = newTastingNotes.findIndex((e) => e.id === this.state.deleteTastingNoteID);

      if (tastingNoteIndex !== -1) {
        newTastingNotes.splice(tastingNoteIndex, 1);
        updatedBrewDetail.tastingNotes = newTastingNotes;

        this.setState({ brewDetail: updatedBrewDetail, tastingNotes: newTastingNotes, deleteTastingNoteID: '', deleteTastingNote: '' });
      }
    } else {
      //this.showErrorModal();
    }
  }

  render() {
    const brew = this.state.brewDetail;

    const ColoredLine = ({ color }) => (
      <hr
        style={{
          color: color,
          background: color,
          height: 0.3,
        }}
      />
    );

    const CssDatePicker = (props) => (
      <CssTextField
        autoComplete="off"
        fullWidth
        inputProps={{ style: { textAlign: 'right', marginRight: '5px' } }}
        InputProps={{ disableUnderline: true }}
        label={props.label}
        onChange={props.onChange}
        onClick={props.onClick}
        value={props.value}
      />
    );

    return (
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <div className="grid-brewed-detail">
          {this.state.hasLoaded ? (
            <React.Fragment>
              <div>
                <BrewDetailTitleArea brewDetail={brew} url={this.state.url} />
                <CountdownButton duration={3000} />
                <CollapsiblePanel
                  title={'Recipe - ' + brew.recipe.name}
                  children={<BrewDetailRecipe recipe={brew.recipe} detailsExpanded={false} hideBrewingSteps={true} />}
                  open={false}
                />
                <BrewDetailBrewedNotes baseUrl={this.props.baseUrl} brewDetail={brew} url={this.state.url} />
                {this.state.brewedState === 2 ? (
                  <div>
                    <div className="brewed-beer-tasting-note-header">
                      <div className="brewed-beer-tasting-note-new">
                        <CSSButton onClick={() => this.displayEditBrewingNotes()} style={{ maxWidth: '32px', minWidth: '32px' }}>
                          <EditIcon />
                        </CSSButton>
                      </div>
                      <div className="brewed-beer-tasting-note-title plain-header">Brewing notes</div>
                    </div>
                    <CssTextField
                      autoComplete="off"
                      disabled={!this.state.editBrewingNotes}
                      fullWidth
                      InputProps={{ disableUnderline: true }}
                      id="brewingNotes"
                      placeholder="Nothing noted"
                      multiline
                      value={this.state.editableBrewingNotes}
                      onChange={(note) => this.setState({ editableBrewingNotes: note.target.value })}
                    />
                    {this.state.editBrewingNotes ? (
                      <div className="brewed-beer-add-tasting-note-buttons">
                        <StyledButton
                          className="button-style"
                          id="okButton"
                          style={{ minWidth: '100px' }}
                          variant="outlined"
                          onClick={this.updateBrewingNotes}
                        >
                          OK
                        </StyledButton>
                        <StyledButton
                          className="button-style"
                          id="cancelButton"
                          style={{ minWidth: '100px' }}
                          variant="outlined"
                          onClick={this.hideBrewingNoteButtons}
                        >
                          Cancel
                        </StyledButton>
                      </div>
                    ) : null}{' '}
                  </div>
                ) : null}
                {this.state.brewedState === 2 ? (
                  <div>
                    <div className="brewed-beer-tasting-note-header">
                      <div className="brewed-beer-tasting-note-new">
                        <CSSButton onClick={() => this.showAddTastingNote()} style={{ maxWidth: '32px', minWidth: '32px' }}>
                          <AddIcon />
                        </CSSButton>
                      </div>
                      <div className="brewed-beer-tasting-note-title plain-header">Tasting notes</div>
                    </div>
                    <div className="brewed-beer-tasting-notes">
                      {/* {brew.tastingNotes.map((tn, index) => ( */}
                      {this.state.tastingNotes.map((tn, index) => (
                        <div>
                          {tn.inEdit === false ? (
                            <div>
                              <div className="brewed-beer-tasting-note-date" onClick={this.editTastingNote(tn.id)}>
                                {moment(tn.date).format('Do-MMM-YYYY')}
                              </div>
                              <div className="brewed-beer-tasting-note-details-container">
                                <span className="brewed-beer-tasting-note-details-container-note" onClick={this.editTastingNote(tn.id)}>
                                  {tn.note}
                                </span>
                                <div className="brewed-beer-tasting-note-details-container-delete" onClick={this.showDeleteTastingNoteModal(tn.id)}>
                                  <CSSIconButton arial-label="delete">
                                    <DeleteIcon fontSize="small" />
                                  </CSSIconButton>
                                </div>
                              </div>
                              <ColoredLine color="lightgray" />
                            </div>
                          ) : (
                            <div>
                              <div className="brewed-beer-add-tasting-note-container">
                                <div className="brewed-beer-add-tasting-note-note">
                                  <CssTextField
                                    autoComplete="false"
                                    fullWidth
                                    InputProps={{ disableUnderline: true }}
                                    id="editTastingNoteDetails"
                                    label="Note"
                                    value={this.state.editTastingNote}
                                    onChange={(note) => this.setState({ editTastingNote: note.target.value })}
                                  />
                                </div>
                                <div className="brewed-beer-add-tasting-note-date">
                                  <ThemeProvider theme={materialTheme}>
                                    <DatePicker
                                      fullWidth
                                      format="DD/MM/YYYY"
                                      id="editDate"
                                      label="Date"
                                      name="date"
                                      value={this.state.editTastingNoteDate}
                                      onChange={(date) => this.setState({ editTastingNoteDate: date })}
                                      animateYearScrolling
                                      TextFieldComponent={CssDatePicker}
                                    />
                                  </ThemeProvider>
                                </div>
                                <div className="brewed-beer-add-tasting-note-buttons">
                                  <StyledButton
                                    className="button-style"
                                    id="okButton"
                                    style={{ minWidth: '100px' }}
                                    variant="outlined"
                                    onClick={this.onUpdateTastingNote}
                                  >
                                    OK
                                  </StyledButton>
                                  <StyledButton
                                    className="button-style"
                                    id="cancelButton"
                                    style={{ minWidth: '100px' }}
                                    variant="outlined"
                                    onClick={this.cancelEditTastingNote(tn.id)}
                                  >
                                    Cancel
                                  </StyledButton>
                                </div>
                              </div>
                              <ColoredLine color="lightgray" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
                <div style={{ position: 'fixed', bottom: '5px', right: '15px' }}>
                  <EditSpeedDial editItemAction={this.editItem} deleteItemAction={this.showDeleteModal} startBrewingAction={this.showDeleteModal} />
                </div>
              </div>
              {this.state.editModalShown ? (
                <div>Show edit modal form</div>
              ) : // <RecipeEditModalForm
              //   modalRef={(n) => (this.modalEditForm = n)}
              //   buttonRef={(n) => (this.closeEditButton = n)}
              //   onSubmit={this.onSubmit}
              //   onChange={this.handleChange}
              //   onDeleteIngredient={this.deleteRecipeIngredient}
              //   onDeleteStep={this.deleteRecipeStep}
              //   closeModal={this.closeEditModal}
              //   onKeyDown={this.onKeyDown}
              //   recipe={this.state.recipeEdit}
              //   baseUrl={this.props.baseUrl}
              //   title="Edit Recipe"
              //   addingNewRecipe="false"
              // />
              null}
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
              {this.state.addNote ? (
                <div className="brewed-beer-add-tasting-note-container">
                  <div className="brewed-beer-add-tasting-note-note">
                    <CssTextField
                      autoComplete="false"
                      fullWidth
                      InputProps={{ disableUnderline: true }}
                      id="addTastingNoteDetails"
                      label="Note"
                      value={this.state.newTastingNoteDetails}
                      onChange={(note) => this.setState({ newTastingNoteDetails: note.target.value })}
                    />
                  </div>
                  <div className="brewed-beer-add-tasting-note-date">
                    <ThemeProvider theme={materialTheme}>
                      <DatePicker
                        fullWidth
                        format="DD/MM/YYYY"
                        id="date"
                        label="Date"
                        name="date"
                        value={this.state.newTastingNoteDate}
                        onChange={(date) => this.setState({ newTastingNoteDate: date })}
                        animateYearScrolling
                        TextFieldComponent={CssDatePicker}
                      />
                    </ThemeProvider>
                  </div>
                  <div className="brewed-beer-add-tasting-note-buttons">
                    <StyledButton
                      className="button-style"
                      id="okButton"
                      style={{ minWidth: '100px' }}
                      variant="outlined"
                      onClick={this.addNewTastingNote}
                    >
                      OK
                    </StyledButton>
                    <StyledButton
                      className="button-style"
                      id="cancelButton"
                      style={{ minWidth: '100px' }}
                      variant="outlined"
                      onClick={this.hideAddTastingNote}
                    >
                      Cancel
                    </StyledButton>
                  </div>
                </div>
              ) : null}
              {this.state.deleteTastingNoteConfirmationModalShown ? (
                <ConfirmationModalForm
                  modalRef={(n) => (this.modalDeleteConfirmationForm = n)}
                  buttonRef={(n) => (this.closeDeleteConfirmationButton = n)}
                  onOK={this.deleteTastingNote}
                  closeModal={this.closeDeleteTastingNoteModal}
                  onKeyDown={this.onKeyDown}
                  confirmationMessage={
                    'Are you sure you want to delete the following note?\n' +
                    this.state.deleteTastingNote +
                    ' [' +
                    moment(this.state.deleteTastingNoteDate).format('Do-MMM-YYYY') +
                    ']'
                  }
                  title="Delete Tasting Note"
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
