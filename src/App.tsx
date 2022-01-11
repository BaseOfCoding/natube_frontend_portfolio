import React from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import Header from "./components/header/header";
import Home from "./pages/home/home";
import SignUp from "./pages/signup/signup";
import VideoPlay from "./pages/videoPlay/videoPlay";
import VideoUploadPage from "./pages/videoUpload/videoUpload";

function App() {
  return (
    <>
      <Header />
      <div id="body">
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/home" component={Home} />
          <Route exact={true} path="/videoupload" component={VideoUploadPage} />
          <Route exact={true} path="/videoplay/:id" component={VideoPlay} />
          <Route exact={true} path="/signup" component={SignUp} />
        </Switch>
      </div>
    </>
  );
}

export default App;
