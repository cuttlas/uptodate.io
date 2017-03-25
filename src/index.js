import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from "react-apollo";
import App from "Components/App/App";
import "./index.css";

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: "http://localhost:4000/graphql"
  })
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
