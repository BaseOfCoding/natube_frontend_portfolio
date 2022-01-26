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
        {/* react-router 라이브러리를 이용해서, Route를 이용해서, 해당 url로 이동하면, import된 tsx 파일로 만들어진 홈페이지를 렌더링하게 된다. default는 Home */}
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
