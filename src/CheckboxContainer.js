import React, { Component } from "react";
import { checkboxes } from "./api/checkboxes.js";
import { Button } from "./Button.js";
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

  // sendState = (props, checked) => {
  //   const name = props.name;
  //   const value = props.value;
  //   const id = props.id;
  //   const isChecked = checked;
  //   const proto = this.props.proto;
  //   return { name, value, isChecked, id, proto };
  // };

  handleChange = event => {
    const isChecked = !this.state.isChecked;
    const value = this.props.value;
    this.setState({
      isChecked: isChecked
    });
    this.props.onChange({ value, isChecked });
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
      <div className={`ui checkbox piece ${this.props.completed}`}>
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
      checkboxes: update.checkboxes,
      defaultState: update.defaultState
    };
  }

  isChecked = box => {
    if (!!box) {
      return box.isChecked;
    } else return false;
  };

  handleSubmit = event => {
    event.preventDefault();
    const isChecked = true;
    this.setState({
      checkAll: isChecked
    });
    const checkThisBoxes = this.returnProperCheckboxes(
      this.state.checkboxes
    ).map(box => {
      const value = box.value;
      return {
        value,
        isChecked
      };
    });

    this.props.onChange(checkThisBoxes);
  };

  returnProperCheckboxes = boxes => {
    return boxes.filter(
      box =>
        box.default.includes(this.state.defaultState) || box.default === "ALL"
    );
  };

  choseYourBaseFirst = () => {
    return <p>Choose your base first..</p>;
  };

  completedOrNot = (arr, val) => {
    console.log(arr, val);
    let className = "";
    if (arr) {
      console.log(arr.filter(e => e === val));
      arr.filter(e => e === val).length > 0
        ? (className += "completed")
        : (className += "failed");
    }
    return className;
  };

  renderCheckBoxes = boxes => {
    const checkboxes = this.returnProperCheckboxes(boxes);

    return (
      <div>
        <div className="container Box">
          {checkboxes.map((box, index) => (
            <Checkbox
              completed={this.completedOrNot(this.props.completed, box.value)}
              isChecked={box.isChecked}
              key={box.key}
              id={index}
              name={box.name}
              value={box.value}
              onChange={this.props.onChange}
              onWrChange={box.value == "addWR" ? this.props.onWrChange : null}
              proto={box}
            />
          ))}
        </div>
        <Button name={"Check All"} onChange={this.handleSubmit} />
      </div>
    );
  };

  render() {
    return (
      <div className="container">
        {!!this.state.defaultState
          ? this.renderCheckBoxes(this.state.checkboxes)
          : this.choseYourBaseFirst()}
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
    if (value.length <= 6) {
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
