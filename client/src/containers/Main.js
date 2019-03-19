import React, { Component, Fragment } from "react";
import Header from "./Header";
import Feed from "../components/Feed";

class Main extends Component {
  state = {
    filter: ""
  };

  handleChange = value => {
    this.setState({ filter: value });
  };

  render() {
    const { history } = this.props;
    const { filter } = this.state;

    console.log("push", this.props);

    return (
      <Fragment>
        <Header history={history} onChange={this.handleChange} />
        <Feed filter={filter} />
      </Fragment>
    );
  }
}

export default Main;
