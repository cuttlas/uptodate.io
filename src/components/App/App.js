import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "components/Header/Header";
import Main from "components/Main/Main";
import Favourites from "components/Favourites/Favourites";
import ForLater from "components/ForLater/ForLater";

import { Container } from "./styles";

export default function() {
  return (
    <Router>
      <Container>
        <Header />
        <Route exact={true} path="/" component={Main} />
        <Route path="/favourites" component={Favourites} />
        <Route path="/forlater" component={ForLater} />
      </Container>
    </Router>
  );
}
