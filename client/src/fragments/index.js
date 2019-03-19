import gql from "graphql-tag";

export const linkFragment = gql`
  fragment LinkParts on Link {
    id
    title
    fileUrl
    description
    postedBy {
      name
    }
    tags
    createdAt
  }
`;
