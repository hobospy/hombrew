import React, { Component } from 'react';

class DoubleCollapsiblePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open
        }
        this.togglePanel = this.togglePanel.bind(this);
    }

    togglePanel(e) {
        this.setState({open: !this.state.open})
    }

    render() {
        return (
            <div className='double-collapsible-panel'>
                <div className='double-collapsible-panel-left-column'>
                    <div onClick={(e)=>this.togglePanel(e)} className='header'>{this.props.leftTitle}</div>
                    {this.state.open ? (<div className='content'>{this.props.leftChild}</div>):null}
                </div>
                <div className='double-collapsible-panel-right-column'>
                    <div onClick={(e)=>this.togglePanel(e)} className='header'>{this.props.rightTitle}</div>
                    {this.state.open ? (<div className='content'>{this.props.rightChild}</div>):null}
                </div>
            </div>
        );
    }
}

export default DoubleCollapsiblePanel;