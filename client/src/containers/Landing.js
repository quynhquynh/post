import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Signup from "./Signup";
import Login from "./Login";
import "../styles/landing.css";
import { AuthenticateProvider } from "../context/AuthenticateContext";
import { styles } from "../styles/material-ui/Landing";

class Landing extends Component {
  state = {
    value: 0
  };

  handleChange = (e, value) => this.setState({ value });

  handleRoute = () => this.setState({ value: 1 });

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    console.log("props in Landing", this.props.history);
    return (
      <div className="landing">
        <AuthenticateProvider
          value={{
            switch: this.handleRoute,
            props: () => this.props.history.push("/main")
          }}
        >
          <AppBar position="static" color="default" classes={classes.root}>
            <Tabs
              value={value}
              classes={{
                root: classes.tabsRoot,
                indicator: classes.tabsIndicator
              }}
              centered
              onChange={this.handleChange}
            >
              <Tab label="Signup" classes={{ root: classes.tabRoot }} />
              <Tab label="Login" classes={{ root: classes.tabRoot }} />
            </Tabs>
          </AppBar>
          <Typography component={!value ? Signup : Login} />
        </AuthenticateProvider>
      </div>
    );
  }
}

export default withStyles(styles)(Landing);
