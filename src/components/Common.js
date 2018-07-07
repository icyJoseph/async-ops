import React from "react";
import { buttonStyle, withMargin } from "../constants";

export const Common = ({ children }) => (
  <div style={withMargin}>{children}</div>
);

export const Button = ({ onClick, children }) => (
  <a onClick={onClick} style={buttonStyle}>
    {children}
  </a>
);

export default Common;
