import React, { Component } from "react";

import "./styles/css/style.css";


export class RadioOption extends React.Component {
  render() {
    return (
      <div className="field">
        <div className="slider">
          <input
            className="hidden"
            type="radio"
            value={this.props.value}
            name={this.props.name}
            onChange={this.props.onChange}
            checked={this.props.isChecked}
          />
          <label
            onClick={this.props.onChange}
            value={this.props.value}
            htmlFor={this.props.name}
          >
            {this.props.value}
          </label>
        </div>
      </div>
    );
  }
}

export const RadioGroup = props => (
  <div className="radio container">
    <div className="fields">
      {React.Children.map(props.children, child => {
        if (child.type === RadioOption)
          return React.cloneElement(child, {
            isChecked: props.value === child.props.value,
            name: props.name,
            onChange: props.onChange
          });
        return child;
      })}
    </div>
  </div>
);
