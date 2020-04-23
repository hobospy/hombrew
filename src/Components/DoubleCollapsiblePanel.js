import React, { Component } from 'react';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';

class DoubleCollapsiblePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
    };
    this.togglePanel = this.togglePanel.bind(this);
  }

  togglePanel(e) {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <div className="double-collapsible-panel">
        <div className="double-collapsible-panel-left-column">
          <div onClick={(e) => this.togglePanel(e)} className="header">
            {this.props.leftTitle}
          </div>
          {this.state.open ? (
            <div className="content">{this.props.leftChild}</div>
          ) : null}
        </div>
        <div className="double-collapsible-panel-right-column">
          <div onClick={(e) => this.togglePanel(e)} className="header">
            {this.props.rightTitle}
            {this.state.open ? (
              <div className="expander-top-right">
                <ExpandLessOutlinedIcon />
              </div>
            ) : (
              <div className="expander-top-right">
                <ExpandMoreOutlinedIcon />
              </div>
            )}
          </div>
          {this.state.open ? (
            <div className="content">{this.props.rightChild}</div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default DoubleCollapsiblePanel;
