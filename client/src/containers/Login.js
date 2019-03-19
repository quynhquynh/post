import React, { Component } from "react";
import Input from "../components/Input";
import { Mutation } from "react-apollo";
import { AuthenticateConsumer } from "../context/AuthenticateContext";
import { login } from "../mutations";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;
    return (
      <AuthenticateConsumer>
        {context => (
          <Mutation
            mutation={login}
            variables={{ ...this.state }}
            onCompleted={() => context.props()}
          >
            {postMutation => (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  postMutation();
                }}
              >
                <Input
                  value={email}
                  name="email"
                  handleInput={this.handleInput}
                  placeholder="* Enter email"
                />
                <Input
                  value={password}
                  name="password"
                  type="password"
                  handleInput={this.handleInput}
                  placeholder="* Enter password"
                />
                <input type="submit" value="Login" />
              </form>
            )}
          </Mutation>
        )}
      </AuthenticateConsumer>
    );
  }
}

export default Login;
