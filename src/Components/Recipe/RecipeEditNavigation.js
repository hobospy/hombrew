import React, { Component } from 'react';
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
