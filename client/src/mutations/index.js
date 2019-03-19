import gql from "graphql-tag";
import { linkFragment } from "../fragments";

export const login = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        name
      }
    }
  }
`;

export const signup = gql`
  mutation SignupMutation($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

export const post = gql`
  mutation PostMutation(
    $title: String!
    $description: String!
    $tags: String
    $file: Upload!
  ) {
    post(description: $description, title: $title, file: $file, tags: $tags) {
      ...LinkParts
    }
  }
  ${linkFragment}
`;
