import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Landing from "../containers/Landing";
import Main from "../containers/Main";
import New from "../containers/New";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/main" component={Main} />
        <Route exact path="/new" component={New} />
      </Switch>
    );
  }
}

export default App;
