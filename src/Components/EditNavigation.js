import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Adjust from '@material-ui/icons/Adjust';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

class EditNavigation extends Component {
  static defaultProps = {
    hasLoaded: false,
    previousDisabled: false,
    previousVisible: true,
    previousEvent: null,
    nextDisabled: false,
    nextVisible: true,
    nextEvent: null,
    saveDisabled: false,
    saveVisible: true,
    saveEvent: null,
    cancelDisabled: false,
    cancelVisible: true,
    cancelEvent: null,
    page: 1,
  };

  render() {
    return (
      <div>
        <div>
          {/* <Button variant="outlined" disabled={this.props.previousDisabled} onClick={this.props.previousEvent} style={{ display: this.props.previousVisible ? 'inline' : 'none' }}>
            Previous
          </Button>
          <div style={{ float: 'right' }}>
            <Button variant="outlined" disabled={this.props.nextDisabled} onClick={this.props.nextEvent} style={{ display: this.props.nextVisible ? 'inline' : 'none' }}>
              Next
            </Button>
            <Button variant="outlined" disabled={this.props.saveDisabled} onClick={this.props.saveEvent} style={{ display: this.props.saveVisible ? 'inline' : 'none' }}>
              Save
            </Button>
            <Button variant="outlined" disabled={this.props.cancelDisabled} onClick={this.props.cancelEvent} style={{ display: this.props.cancelVisible ? 'inline' : 'none' }}>
              Cancel
            </Button>
          </div> */}
        </div>
        <div className="edit-page-indicator-container">
          <div className="edit-page-indicator-page1">
            <RadioButtonCheckedIcon style={{ display: this.props.page === 1 ? 'inline' : 'none' }} />
            <RadioButtonUncheckedIcon style={{ display: this.props.page === 1 ? 'none' : 'inline' }} />
          </div>
          <div className="edit-page-indicator-page2">
            <RadioButtonCheckedIcon style={{ display: this.props.page === 2 ? 'inline' : 'none' }} />
            <RadioButtonUncheckedIcon style={{ display: this.props.page === 2 ? 'none' : 'inline' }} />
          </div>
          <div className="edit-page-indicator-page3">
            <RadioButtonCheckedIcon style={{ display: this.props.page === 3 ? 'inline' : 'none' }} />
            <RadioButtonUncheckedIcon style={{ display: this.props.page === 3 ? 'none' : 'inline' }} />
          </div>
        </div>
      </div>
    );
  }
}

export default EditNavigation;
