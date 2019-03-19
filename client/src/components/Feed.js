import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import Link from "../containers/Link";
import { feed } from "../queries";
import "../styles/feed.css";

class Feed extends Component {
  render() {
    const { filter } = this.props;
    return (
      <div className="feed">
        <Query query={feed} variables={{ filter }}>
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
