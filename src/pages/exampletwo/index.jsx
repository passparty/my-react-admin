import React, { Component } from 'react';
import './style.less';
import CustomBreadcrumb from '../compontent/customBreadcrumb'

export default class extends Component {
  state = {
    text: '',
  }
  onTextReset = () => {
    this.setState({ text: '' });
  }
  onTextChange = (event) => {
    this.setState({ text: event.target.value });
  }
  render() {

    return (
      <div>
        <CustomBreadcrumb  />
        <div className="container">
          <div>
            <input value={this.state.text} onChange={this.onTextChange} />
          </div>
          <button
            className="buttonCss"
            onClick={this.onTextReset}>
            Reset
        </button>
        </div>
      </div>
    );
  }
}