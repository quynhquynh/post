import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Input from "../components/Input";
import { AuthenticateConsumer } from "../context/AuthenticateContext";
import { signup } from "../mutations";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: ""
    };
  }

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { name, email, password, password2 } = this.state;
    return (
      <AuthenticateConsumer>
        {context => (
          <Mutation
            mutation={signup}
            variables={{ email, password, name }}
            onCompleted={() => {
              this.setState({
                name: "",
                email: "",
                password: ""
              });
              context.switch();
            }}
          >
            {postMutation => (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  postMutation();
                }}
              >
                <Input
                  value={name}
                  name="name"
                  handleInput={this.handleInput}
                  placeholder="e.g: John Doe"
                />
                <Input
                  value={email}
                  name="email"
                  handleInput={this.handleInput}
                  placeholder="e.g: john.doe@gmail.com"
                />
                <Input
                  value={password}
                  name="password"
                  type="password"
                  handleInput={this.handleInput}
                  placeholder="* Enter password"
                />
                <Input
                  value={password2}
                  name="password2"
                  type="password"
                  handleInput={this.handleInput}
                  placeholder="* Enter confirm password"
                />
                <input type="submit" value="Signup" />
              </form>
            )}
          </Mutation>
        )}
      </AuthenticateConsumer>
    );
  }
}

export default Signup;
