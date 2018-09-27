import React, { Component } from "react";
import { integrate } from "./Robots/robots.js";
import { checkboxes } from "./api/checkboxes.js";
import { regFor, s } from "./api/regExp.js";

import "./styles/css/style.css";

class App extends Component {
  state = {
    radio: "",
    checkbox: {},
    trackingCodes: {}
  };

  handleRadioChange = event => {
    const target = event.target;
    const type = target.type;
    if (type === "radio" || target.htmlFor === "base") {
      const base = target.value || target.textContent;
      this.setState({
        radio: base,
        checkbox: {}
      });
    }
  };

  handleCheckboxChange = event => {
    const checkboxState = Object.assign({}, this.state.checkbox);
    console.log(checkboxState);
    checkboxState[event.value] = event;
    this.setState({
      checkbox: checkboxState
    });
  };

  handleWrChange = value => {
    if (this.state.checkbox.addWR) {
      const checkboxState = Object.assign({}, this.state.checkbox);
      checkboxState.addWR.wr = value;
      checkboxState.addWR.proto.code = s.imgUrl + value + "_";
      this.setState({
        checkbox: checkboxState
      });
    }
  };

  // handleCheckboxChange = event => {
  //   const keep = this.activeCheckboxes(event);
  //   const checkboxState = this.state.checkbox;
  //   if (event.isChecked) checkboxState.push(event);
  //   this.setState({
  //     checkbox: keep(checkboxState)
  //   });
  // };

  handleSelectChange = tracking => {
    const trackingCodes = this.state.trackingCodes;
    trackingCodes[tracking.name] = {
      domain: tracking.domain,
      tracking: tracking.trackingCode
    };
    this.setState({
      trackingCodes
    });
  };

  handleTextAreaChnage = textarea => {
    this.setState({
      textarea
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    console.log("integrate!");
    const updatedContent = this.integrate(this.state.textarea);
    this.setState({
      updatedContent
    });

    console.log(updatedContent);
  };

  integrate = string => {
    const htmlCode = this.state.textarea;
    const trackingCodes = this.state.trackingCodes;
    const checkboxActions = this.activeCheckboxes(this.state.checkbox);
    console.log(checkboxActions);
    return integrate(htmlCode, trackingCodes, checkboxActions);
  };

  activeCheckboxes = boxes => {
    const arrayBoxes = Object.keys(boxes).map(i => boxes[i]);
    return arrayBoxes.filter(active => active.isChecked).map(box => box.proto);
  };

  // const peopleArray = Object.keys(peopleObj).map(i => peopleObj[i])
  // activeCheckboxes = e => boxes => {
  //   return boxes
  //     .map(o => (o.id === e.id ? Object.assign(o, e) : o))
  //     .filter(active => active.isChecked);
  // };

  render() {
    return (
      <form className="App">
        <h1>HTML integrator</h1>
        <h2>Choose email base</h2>
        <RadioGroup
          name="base"
          value={this.state.radio}
          onChange={this.handleRadioChange}
        >
          <RadioOption value="HR" />
          <RadioOption value="LHR" />
          <RadioOption value="HEX" />
        </RadioGroup>
        <h2>Settings</h2>
        <CheckboxContainer
          isChecked={this.state.checkbox}
          checkboxes={checkboxes}
          onChange={this.handleCheckboxChange}
          onWrChange={this.handleWrChange}
          defaultState={this.state.radio}
        />
        <h2>Tracking Codes</h2>
        <SelectContainer onChange={this.handleSelectChange}>
          <Select trackName={"TID"} />
          <Select trackName={"CRM"} />
          <Select trackName={"REC"} />
        </SelectContainer>
        <h2>Email Code</h2>
        <TextArea onChange={this.handleTextAreaChnage} />
        <Button
          id={"submit"}
          name={"Integrate!"}
          onChange={this.handleSubmit}
        />
      </form>
    );
  }
}

class RadioOption extends React.Component {
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

const RadioGroup = props => (
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

class Checkbox extends Component {
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

class CheckboxContainer extends Component {
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

// const CheckboxContainer = props => (
//   <div className="Checkbox Box">
//     {React.Children.map(props.children, (child, index) => {
//       if (child.type === Checkbox) {
//
//         return React.cloneElement(child, {
//           //default: props.default,
//           key: index,
//           id: index,
//           onChange: props.onChange
//         });
//         return child;
//       }
//     })}
//   </div>
// );

class Select extends React.Component {
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
class SelectContainer extends Component {
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

class TextArea extends Component {
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

const Button = props => (
  <button
    className="button"
    id={props.id}
    onClick={props.onChange}
    type="submit"
  >
    {props.name}
  </button>
);
// const TrackingCode = props => (
//   <div className="label_container">
//     <label className="name" htmlFor="crm">
//       {props.name}
//     </label>
//     <input
//       type="text"
//       value={""}
//       className="input"
//       name="options"
//       autoComplete="off"
//     />
//   </div>
// );

export default App;
