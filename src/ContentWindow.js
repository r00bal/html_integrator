import React, { Component } from "react";
import { Button } from "./Button.js";
import { TextArea } from "./TextArea.js";
import "./ContentWindow.css";

export const ContentWindow = props => (
  <div className={"container textarea contentWindow " + props.class}>
    <TextArea
      copy={"Integrated content:"}
      disabled={false}
      content={props.content}
    />
    <Button id={"submit"} name={"Copy"} onChange={props.copy} />
  </div>
);
