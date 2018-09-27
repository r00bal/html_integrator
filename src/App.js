import React, { Component } from "react";
import { integrate } from "./Robots/robots.js";
import { checkboxes } from "./api/checkboxes.js";
import { regFor, s } from "./api/regExp.js";
import {CheckboxContainer} from "./CheckboxContainer.js";
import {SelectContainer, Select} from "./SelectContainer.js";
import {RadioGroup, RadioOption} from "./RadioGroup.js";
import {TextArea} from "./TextArea.js";
import {Button} from "./Button.js";

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



export default App;
