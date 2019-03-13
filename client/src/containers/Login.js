import React, { Component } from "react";
import Input from "../components/Input";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        name
      }
    }
  }
`;

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
      <Mutation
        mutation={LOGIN_MUTATION}
        variables={{ ...this.state }}
        onCompleted={() => this.props.history.push("/main")}
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
    );
  }
}

export default Login;
