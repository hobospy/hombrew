import React, { Component, Fragment } from 'react';
import DayjsUtils from '@date-io/dayjs';
import dayjs from 'dayjs';
import { TextField, createMuiTheme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';

import ConfirmationModalForm from '../SupportComponents/ConfirmationModalForm';

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

class BrewDetailBrewedNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false,
      url: this.props.url,
      brewDetail: this.props.brewDetail,
      editBrewingNotes: false,
      editableBrewingNotes: '',
      tastingNotes: [],
      addNote: false,
      newTastingNoteDate: dayjs(),
      newTastingNoteDetails: '',
      deleteTastingNoteID: '',
      deleteTastingNote: '',
      deleteTastingNoteDate: '',
      deleteTastingNoteConfirmationModalShown: false,
      editTastingNoteID: '',
      editTastingNote: '',
      editTastingNoteDate: '',
      editingTastingNote: false,
    };

    this.displayEditBrewingNotes = this.displayEditBrewingNotes.bind(this);
    this.updateBrewingNotes = this.updateBrewingNotes.bind(this);
    this.hideBrewingNoteButtons = this.hideBrewingNoteButtons.bind(this);
    this.showAddTastingNote = this.showAddTastingNote.bind(this);
    this.editTastingNote = this.editTastingNote.bind(this);
    this.deleteTastingNote = this.deleteTastingNote.bind(this);
    this.showDeleteTastingNoteModal = this.showDeleteTastingNoteModal.bind(this);
    this.closeDeleteTastingNoteModal = this.closeDeleteTastingNoteModal.bind(this);
    this.onUpdateTastingNote = this.onUpdateTastingNote.bind(this);
    this.cancelEditTastingNote = this.cancelEditTastingNote.bind(this);
  }

  componentDidMount() {
    var tastingNoteList = [];
    if (this.state.brewDetail.tastingNotes !== undefined) {
      this.state.brewDetail.tastingNotes.forEach(function (arrayItem) {
        const obj = {
          id: arrayItem.id,
          note: arrayItem.note,
          date: arrayItem.date,
          brewID: arrayItem.brewID,
          inEdit: false,
        };

        tastingNoteList.push(obj);
      });
      this.setState({ editableBrewingNotes: this.state.brewDetail.brewingNotes });
    }

    tastingNoteList.sort(function compare(a, b) {
      var dateA = new Date(a.date);
      var dateB = new Date(b.date);

      return dateA - dateB;
    });

    this.setState({ tastingNotes: tastingNoteList, hasLoaded: true });
  }

  toggleScrollLock = () => {
    document.querySelector('html').classList.toggle('scroll-lock');
  };

  displayEditBrewingNotes = () => {
    this.setState({ editBrewingNotes: true });
  };

  hideBrewingNoteButtons = () => {
    this.setState({ editableBrewingNotes: this.state.brewDetail.brewingNotes === null ? '' : this.state.brewDetail.brewingNotes });
    this.setState({ editBrewingNotes: false });
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

  showAddTastingNote = () => {
    this.setState({ newTastingNoteDetails: '' });
    this.setState({ newTastingNoteDate: dayjs() });
    this.setState({ addNote: true });
  };

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
      var newTastingNotes = this.state.tastingNotes;
      var tastingNoteIndex = newTastingNotes.findIndex((e) => e.id === this.state.deleteTastingNoteID);

      if (tastingNoteIndex !== -1) {
        newTastingNotes.splice(tastingNoteIndex, 1);

        this.setState({ tastingNotes: newTastingNotes, deleteTastingNoteID: '', deleteTastingNote: '' });
      }
    } else {
      //this.showErrorModal();
    }
  }

  render() {
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
      <Fragment>
        <div>
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
              onClick={() => this.displayEditBrewingNotes()}
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
        </div>
      </Fragment>
    );
  }
}

export default BrewDetailBrewedNotes;
