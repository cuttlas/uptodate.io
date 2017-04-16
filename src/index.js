import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from "react-apollo";
import App from "components/App/App";
import "./index.css";
import qs from "query-string";
import * as storage from "utils/storage";

//TAB FROM TWITTER.
const queryParams = qs.parse(location.search);

if (queryParams && queryParams.token) {
  storage.set({
    key: "token",
    value: queryParams.token,
    persist: true
  });
  window.opener.location.reload();
  window.close();
}

const networkInterface = createNetworkInterface({
  uri: "http://localhost:4000/graphql"
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}; // Create the header object if needed.
      }

      // get the authentication token from local storage if it exists
      const token = storage.get("token");
      req.options.headers.Authorization = token;
      next();
    }
  }
]);

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => {
    if (o.id) return `${o.__typename}:${o.id}`;
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
