import React from "react";

export const Header = ({ logo }) => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h1 className="App-title">Async/sync array creation</h1>
    <p className="App-intro">
      Experience and measure performance when creating a very large array
    </p>
  </header>
);

export default Header;
