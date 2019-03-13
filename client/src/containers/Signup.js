import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Input from "../components/Input";
import { AuthenticateConsumer } from "./AuthenticateContext";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

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
            mutation={SIGNUP_MUTATION}
            variables={{ email, password, name }}
            onCompleted={() =>
              this.setState({
                name: "",
                email: "",
                password: ""
              })
            }
          >
            {postMutation => (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  postMutation();
                  context();
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
