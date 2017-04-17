import React from "react";
import { Route } from "react-router-dom";

import qs from "query-string";

import Header from "components/Header/Header";
import Main from "components/Main/Main";
import Favourites from "components/Favourites/Favourites";
import ForLater from "components/ForLater/ForLater";

import { Container } from "./styles";

const getQ = search => {
  const queryParams = qs.parse(search);
  return queryParams.q;
};

export default () => (
  <Container>
    <Header />
    <Route
      exact
      path="/"
      render={props => <Main q={getQ(props.location.search)} />}
    />
    <Route
      path="/favourites"
      render={props => <Favourites q={getQ(props.location.search)} />}
    />
    <Route
      path="/forlater"
      render={props => <ForLater q={getQ(props.location.search)} />}
    />
  </Container>
);
