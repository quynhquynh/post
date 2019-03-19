import React, { Fragment } from "react";
import Header from "../containers/Header";
import Feed from "./Feed";

export default ({ history: push }) => {
  return (
    <Fragment>
      <Header history={push} />
      <Feed />
    </Fragment>
  );
};
