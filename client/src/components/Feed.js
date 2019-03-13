import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Link from "../containers/Link";
import "../styles/feed.css";

export const FEED_QUERY = gql`
  query {
    feed {
      links {
        id
        title
        fileUrl
        description
        postedBy {
          name
        }
        votes {
          user {
            name
          }
        }
        createdAt
      }
    }
  }
`;

class Feed extends Component {
  render() {
    return (
      <div className="feed">
        <Query query={FEED_QUERY}>
          {({ data, loading, error }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>error</p>;
            const {
              feed: { links }
            } = data;
            return (
              <Fragment>
                {links.map(
                  ({
                    id,
                    title,
                    fileUrl,
                    description,
                    createdAt,
                    votes,
                    postedBy: { name = "Anonymous" }
                  }) => (
                    <div key={id}>
                      <Link
                        title={title}
                        author={name}
                        fileUrl={fileUrl}
                        createdAt={createdAt}
                        description={description}
                        votes={votes}
                      />
                    </div>
                  )
                )}
              </Fragment>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Feed;
