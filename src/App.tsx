import React from "react";
import { Redirect, Route, Switch } from "react-router";
import "./App.css";
import Header from "./components/header/header";
import Home from "./pages/home/home";

function App() {
  return (
    <>
      <Header />
      <div id="body">
        <Switch>
          <Redirect exact path="/" to="/home" />
          <Route exact path="/home" component={Home} />
        </Switch>
      </div>
    </>
  );
}

export default App;
