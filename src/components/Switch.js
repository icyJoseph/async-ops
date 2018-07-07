import React, { Fragment } from "react";
import { TOGGLE_ON, TOGGLE_OFF, MODE, ASYNC, SYNC } from "../constants";
import "./Switch.css";

export const toggleSwitch = state => {
  switch (state) {
    case TOGGLE_ON:
      return TOGGLE_OFF;
    case TOGGLE_OFF:
      return TOGGLE_ON;
    default:
      return TOGGLE_ON;
  }
};

export const reduceState = state => {
  switch (state) {
    case TOGGLE_ON:
      return TOGGLE_OFF;
    case TOGGLE_OFF:
      return TOGGLE_ON;
    default:
      return TOGGLE_ON;
  }
};

export const Switch = ({ value, toggle }) => {
  return (
    <Fragment>
      <input
        type="checkbox"
        id="switch"
        name="set-name"
        className="switch-input"
        value={value}
        onChange={toggle}
      />
      <label htmlFor="switch" className="switch-label">
        <span className="toggle--off">{SYNC}</span>
        <span className="toggle--on">{ASYNC}</span> {MODE}
      </label>
    </Fragment>
  );
};

export default Switch;
