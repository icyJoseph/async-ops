import React, { Fragment } from "react";
import "./Switch.css";

export const TOGGLE_ON = "toggle--on";
export const TOGGLE_OFF = "toggle--off";

export const MODE = "Mode";
export const ASYNC = "Asynchronous";
export const SYNC = "Synchronous";

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
