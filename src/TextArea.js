import React, { Component } from "react";

import "./styles/css/style.css";

export class TextArea extends Component {
  state = {
    content: "",
    error: false
  };
  handleTextareaChange = event => {
    const value = event.target.value;
    this.setState({
      content: value
    });
    this.props.onChange ? this.props.onChange(value) : null;
  };

  handleFocus = event => {
    event.target.select();
  };

  getDerivedStateFromProps(nextProps) {
    if (nextProps.error) {
      return { error: nextProps.error };
    } else return null;
  }

  render() {
    return (
      <div className="textarea container">
        <label for="basic">{this.props.copy}</label>
        <textarea
          ref="newText"
          id="textarea"
          name="basic"
          onChange={this.handleTextareaChange}
          onFocus={this.handleFocus}
          disabled={this.props.disabled}
          value={this.props.content ? this.props.content : this.state.content}
        />
      </div>
    );
  }
}
