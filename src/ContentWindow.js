import React, { Component } from "react";
import { Button } from "./Button.js";
import "./ContentWindow.css";


export const ContentWindow = props => (
  <div className={"container textarea contentWindow " + props.class}>

    <label for="basic">Integrated content</label>
    <textarea className="contentText"
      id="textarea"
      name="basic"
      value={props.content}
    />
    {/*<Button
      id={"submit"}
      name={"Copy"}
    /> */}

  </div>

);
