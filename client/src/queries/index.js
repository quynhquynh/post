import gql from "graphql-tag";
import { linkFragment } from "../fragments";

export const feed = gql`
  query {
    feed {
      links {
        ...LinkParts
      }
    }
  }
  ${linkFragment}
`;
