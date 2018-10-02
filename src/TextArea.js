import React, { Component } from "react";

import "./styles/css/style.css";



export class TextArea extends Component {
  handleTextareaChange = event => {
    const value = event.target.value;
    this.props.onChange(value);
  };

  render() {
    return (
      <div className="textarea container">
        <label for="basic">Past your code here:</label>
        <textarea
          id="textarea"
          name="basic"
          onChange={this.handleTextareaChange}
        />
      </div>
    );
  }
}
