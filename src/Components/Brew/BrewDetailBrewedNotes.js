import React, { Component, Fragment } from 'react';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';

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

class BrewDetailBrewedNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.url,
      brewDetail: this.props.brewDetail,
      editBrewingNotes: false,
      editableBrewingNotes: '',
    };

    this.displayEditBrewingNotes = this.displayEditBrewingNotes.bind(this);
    this.updateBrewingNotes = this.updateBrewingNotes.bind(this);
    this.hideBrewingNoteButtons = this.hideBrewingNoteButtons.bind(this);
  }

  componentDidMount() {
    this.setState({ editableBrewingNotes: this.state.brewDetail.brewingNotes });
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

  updateBrewingNotes = () => {
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
  };

  render() {
    return (
      <Fragment>
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
              <StyledButton className="button-style" id="okButton" style={{ minWidth: '100px' }} variant="outlined" onClick={this.updateBrewingNotes}>
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
      </Fragment>
    );
  }
}

export default BrewDetailBrewedNotes;
