import React, { Component } from "react";

import "./styles/css/style.css";



export class Select extends React.Component {
  state = {
    dropdown: false,
    domain: "Choose domain",
    value: ""
  };

  handleclick = e => {
    e.stopPropagation();
    const domain = e.target.id;
    const name = this.props.trackName;
    this.setState({
      //dropdown: !this.state.dropdown,
      domain
    });
    this.props.activeDropdown({ name, domain });
    this.sendStateToApp(this.props.trackName, domain, this.state.value);
  };

  handleChange = e => {
    const value = e.target.value;
    this.setState({
      value
    });
    this.sendStateToApp(this.props.trackName, this.state.domain, value);
  };

  sendStateToApp = (name, domain, trackingCode) => {
    //  if (domain != "Choose domain" && trackingCode) {

    if (domain !== "Choose domain") {
      this.props.onChange({ name, domain, trackingCode });
    }
    //console.log(this.props.dropdown);
  };

  static getDerivedStateFromProps(nextProps) {
    return { dropdown: nextProps.dropdown };
  }

  render() {
    const dropActive = ["dropdown"];
    if (this.state.dropdown) {
      dropActive.push("drop-active");
    }

    const selectActive = ["select"];
    if (this.state.dropdown) {
      selectActive.push("active");
    }

    const selected = condition => {
      return condition ? "item selected" : "item";
    };
    return (
      <div className="label_container">
        <label className="name" htmlFor="tid">
          {this.props.trackName}
        </label>
        <div className={dropActive.join(" ")} tabIndex="0">
          <select>
            <option checked={this.state.domain === "All"} value="All">
              All
            </option>
            <option checked={this.state.domain === "Heathrow"} value="Heathrow">
              Heathrow
            </option>
            <option
              checked={this.state.domain === "HeathrowExpress"}
              value="Heathrow Express"
            >
              HeathrowExpress
            </option>
          </select>
          <div
            onClick={this.handleclick}
            id={this.state.domain}
            className="text"
            value="Add"
          >
            {this.state.domain}
          </div>
          <div className={selectActive.join(" ")} tabIndex="-1">
            <div
              onClick={this.handleclick}
              className={selected(this.state.domain === "All")}
              id={"All"}
            >
              All
            </div>
            <div
              onClick={this.handleclick}
              className={selected(this.state.domain === "Heathrow")}
              id={"Heathrow"}
            >
              Heathrow
            </div>
            <div
              onClick={this.handleclick}
              className={selected(this.state.domain === "HeathrowExpress")}
              id={"HeathrowExpress"}
            >
              HeathrowExpress
            </div>
          </div>
        </div>

        <input
          onChange={this.handleChange}
          value={this.state.value}
          placeholder={this.props.placeholder}
          type="text"
          id="tid"
          className="input"
          name="options"
          autoComplete="off"
          autoComplete="nope"
        />
      </div>
    );
  }
}
export class SelectContainer extends Component {
  state = {};

  handleDropdown = select => {
    const oldState = this.state;
    for (var key in oldState) {
      if (select.name !== key && oldState[key])
        this.setState({ [key]: !oldState[key] });
    }

    if (select.domain === "Choose domain") {
      this.setState({
        [select.name]: true
      });
    } else {
      this.setState({
        [select.name]: !this.state[select.name]
      });
    }
  };

  render() {
    return (
      <div className="options container">
        {React.Children.map(this.props.children, (child, index) => {
          const name = child.props.trackName;
          if (child.type === Select)
            return React.cloneElement(child, {
              key: index, //isChecked: props.value === child.props.value,
              activeDropdown: this.handleDropdown,
              dropdown: this.state[name],
              onChange: this.props.onChange,
              placeholder: `Paste your ${child.props.trackName} here`
            });
          return child;
        })}
      </div>
    );
  }
}
