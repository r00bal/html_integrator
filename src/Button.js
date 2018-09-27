import React, { Component } from "react";

import "./styles/css/style.css";



export const Button = props => (
  <button
    className="button"
    id={props.id}
    onClick={props.onChange}
    type="submit"
  >
    {props.name}
  </button>
);
