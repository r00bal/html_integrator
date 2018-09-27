import React, { Component } from "react";
import { integrate } from "./Robots/robots.js";
import { checkboxes } from "./api/checkboxes.js";
import { regFor, s } from "./api/regExp.js";

import "./styles/css/style.css";

export class Checkbox extends Component {
  state = {
    isChecked: false
    // value: ""
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isChecked !== prevState.isChecked) {
      return {
        isChecked: nextProps.isChecked
      };
    } else return null;
  }

  sendState = (props, checked) => {
    const name = props.name;
    const value = props.value;
    const id = props.id;
    const isChecked = checked;
    const proto = this.props.proto;
    return { name, value, isChecked, id, proto };
  };

  handleChange = event => {
    const isChecked = !this.state.isChecked;
    this.setState({
      isChecked: isChecked
    });
    this.props.onChange(this.sendState(this.props, isChecked));
  };

  renderInput = wr => {
    if (wr === "addWR") {
      return (
        <WrInput
          disabled={!this.state.isChecked}
          onWrChange={this.props.onWrChange}
        />
      );
    }
  };
  render() {
    return (
      <div className="ui checkbox piece">
        <input
          className="box"
          id={this.props.id}
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.handleChange}
          value={this.props.value}
          name={this.props.name}
          //prototype={this.props.proto}
        />
        <label>{this.props.name}</label>
        {this.renderInput(this.props.value)}
      </div>
    );
  }
}

export class CheckboxContainer extends Component {
  state = {
    checkboxes: "",
    defaultState: "",
    checkAll: false
  };

  static getDerivedStateFromProps(update) {
    return {
      checkboxes: update.isChecked,
      defaultState: update.defaultState
    };
  }

  isChecked = box => {
    if (!!box) {
      return box.isChecked;
    } else return false;
  };

  // handleSubmit = event => {
  //   event.preventDefault();
  //   const checked = !this.state.checkAll;
  //   this.setState({
  //     checkAll: checked
  //   });
  //   const checkThisBoxes = this.returnProperCheckboxes(this.props.checkboxes);
  //
  //   this.props.onChange(this.sendState(checkThisBoxes, checked));
  //
  //   // checkThisBoxes.forEach(box =>
  //   //   this.props.onChange(this.sendState(box, checked))
  //   // );
  //   //return this.props.onChange(this.sendState(box, checked))
  //
  //   //this.props.onChange(this.sendState(this.props, isChecked));
  // };

  // sendState = (props, checked) => {
  //   const name = props.name;
  //   const value = props.value;
  //   const id = props.id;
  //   const isChecked = checked;
  //   const proto = props;
  //   return { name, value, isChecked, id, proto };
  // };

  returnProperCheckboxes = boxes => {
    return boxes.filter(box => {
      //return this.state.defaultState === box.default || box.default === "ALL";
      return (
        box.default.includes(this.state.defaultState) || box.default === "ALL"
      );
    });
  };

  renderCheckBoxes = boxes => {
    const checkboxes = this.returnProperCheckboxes(boxes);
    return checkboxes.map((box, index) => {
      return (
        <Checkbox
          isChecked={this.isChecked(this.state.checkboxes[box.value])}
          key={index}
          id={index}
          name={box.name}
          value={box.value}
          onChange={this.props.onChange}
          onWrChange={box.value == "addWR" ? this.props.onWrChange : null}
          proto={box}
        />
      );
    });
  };
  render() {
    const checkboxes = this.props.checkboxes;
    return (
      <div>
        <div className="container Box">{this.renderCheckBoxes(checkboxes)}</div>
        {/* <Button name={"Check All"} onChange={this.handleSubmit} /> */}
      </div>
    );
  }
}


class WrInput extends Component {
  state = {
    isChecked: false,
    value: ""
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.disabled !== prevState.isChecked) {
      return {
        value: "",
        isChecked: prevState.isChecked
      };
    } else return null;
  }

  handleChange = event => {
    const value = event.target.value;
    console.log(value);
    if (value.length < 7) {
      this.setState({
        value
      });
    }
    this.props.onWrChange(value);
  };

  render() {
    return (
      <div className="addWR">
        <input
          id="wr"
          disabled={this.props.disabled}
          onChange={this.handleChange}
          type="text"
          value={this.state.value}
          placeholder={"WR3333"}
        />
      </div>
    );
  }
}
