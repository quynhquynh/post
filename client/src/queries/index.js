import gql from "graphql-tag";
import { linkFragment } from "../fragments";

// export const feed = gql`
//   query {
//     feed {
//       links {
//         ...LinkParts
//       }
//     }
//   }
// `;

export const feed = gql`
  query FeedQuery($filter: String) {
    feed(filter: $filter) {
      links {
        ...LinkParts
      }
    }
  }
  ${linkFragment}
`;
