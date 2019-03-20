import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
// import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { BrowserRouter } from "react-router-dom";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-boost";
import apolloLogger from "apollo-link-logger";
import { createPersistedQueryLink } from "apollo-link-persisted-queries";

// const httpLink = createHttpLink({
//   uri: "http://localhost:4000"
// });

const uploadLink = createUploadLink({
  uri: "http://localhost:4000"
});

const persistedQueryLink = createPersistedQueryLink().concat(uploadLink);

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: ApolloLink.from([apolloLogger, errorLink, persistedQueryLink]),
  cache: new InMemoryCache(),
  connectToDevTools: true
  // request: async operation => {
  //   console.log("operation", await operation);
  // } not working
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
