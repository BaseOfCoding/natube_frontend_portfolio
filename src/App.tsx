import React from "react";
import { Redirect, Switch } from "react-router";
import "./App.css";
import Header from "./components/header/header";

function App() {
  return (
    <>
      <Header />
      <div id="body">
        <Switch>
          <Redirect exact path="/" to="/home" />
        </Switch>
      </div>
    </>
  );
}

export default App;
