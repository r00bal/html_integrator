import React, { Component } from "react";
import { integrate } from "./Robots/robots.js";
import { checkboxes } from "./api/checkboxes.js";
import { regFor, s } from "./api/regExp.js";
import { CheckboxContainer } from "./CheckboxContainer.js";
import { SelectContainer, Select } from "./SelectContainer.js";
import { RadioGroup, RadioOption } from "./RadioGroup.js";
import { TextArea } from "./TextArea.js";
import { Button } from "./Button.js";
import { ContentWindow } from "./ContentWindow.js";

import "./styles/css/style.css";

class App extends Component {
  state = {
    radio: "",
    checkbox: [],
    trackingCodes: {},
    updatedContent: ""
  };

  componentWillMount() {
    const checkboxState = checkboxes.map((box, i) =>
      Object.assign(box, {
        key: i,
        isChecked: false
      })
    );
    this.setState({
      checkbox: checkboxState
    });
  }

  handleRadioChange = event => {
    const target = event.target;
    const type = target.type;
    if (type === "radio" || target.htmlFor === "base") {
      const base = target.value || target.textContent;
      const checkbox = this.state.checkbox.map(box => ({
        ...box,
        isChecked: false
      }));
      this.setState({
        radio: base,
        checkbox,
        errorMessage: null
      });
    }
  };

  handleCheckboxChange = event => {
    const checkboxState = this.state.checkbox.map(box => {
      if (box.value === event.value) {
        return Object.assign(box, event);
      }
      if (Array.isArray(event)) {
        event.forEach(element => {
          if (element.value === box.value) {
            return Object.assign(box, element);
          }
        });
      }
      return box;
    });
    this.setState({
      checkbox: checkboxState
    });
  };

  handleWrChange = value => {
    const wr = s.imgUrl + value + "_";
    const checkboxState = this.state.checkbox.map(
      box => (box.value === "addWR" ? { ...box, code: wr } : box)
    );

    this.setState({
      checkbox: checkboxState
    });
    // }
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
      textarea,
      errorMessage: null
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    console.log("integrate!");
    const updatedContent = this.integrate(this.state.textarea);
    // use handling error functions
    // if htmlValidation than update errorMessage
    if (!!updatedContent) {
      this.setState({
        updatedContent: updatedContent.finalCode,
        completedTask: updatedContent.completedTask
      });
    } else {
      this.setState({
        errorMessage: `Don't forget to past your code first`
      });
    }
  };

  integrate = string => {
    const htmlCode = this.state.textarea;
    const trackingCodes = this.state.trackingCodes;
    const checkboxActions = this.activeCheckboxes(this.state.checkbox);
    return integrate(htmlCode, trackingCodes, checkboxActions);
  };

  activeCheckboxes = boxes => {
    return boxes.filter(active => active.isChecked);
  };

  copyToClipboard = e => {
    e.preventDefault();
    //this.refs.newText.getDOMNode().select();
    const textField = document.createElement("textarea");
    textField.innerText = this.state.updatedContent;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  // const peopleArray = Object.keys(peopleObj).map(i => peopleObj[i])
  // activeCheckboxes = e => boxes => {
  //   return boxes
  //     .map(o => (o.id === e.id ? Object.assign(o, e) : o))
  //     .filter(active => active.isChecked);
  // };

  render() {
    return (
      <div>
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
            completed={this.state.completedTask}
            checkboxes={this.state.checkbox}
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
          <TextArea
            copy={
              this.state.errorMessage
                ? this.state.errorMessage
                : "Past your code here:"
            }
            onChange={this.handleTextAreaChnage}
          />
          <Button
            id={"submit"}
            name={"Integrate!"}
            onChange={this.handleSubmit}
          />
          <ContentWindow
            class={this.state.updatedContent ? "show" : ""}
            content={this.state.updatedContent}
            copy={this.copyToClipboard}
          />
        </form>
      </div>
    );
  }
}

export default App;
