import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Landing from "../containers/Landing";
import Signup from "../containers/Signup";
import Login from "../containers/Login";
import Main from "./Main";
import New from "../containers/New";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/main" component={Main} />
        <Route exact path="/new" component={New} />
      </Switch>
    );
  }
}

export default App;
