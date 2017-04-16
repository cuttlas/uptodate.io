import React, { Component } from "react";
import { Route } from "react-router-dom";

import Header from "components/Header/Header";
import Main from "components/Main/Main";
import Favourites from "components/Favourites/Favourites";
import ForLater from "components/ForLater/ForLater";

import { Container } from "./styles";
import { mainQuery, favouritesQuery, forLaterQuery } from "queries";

export default class App extends Component {
  state = {
    search: null
  };
  componentWillReceiveProps(newProps) {
    console.log(newProps);
    if (this.props.location.pathname !== newProps.location.pathname) {
      this.setState({
        search: null
      });
    }
  }
  setSearch = value =>
    this.setState({
      search: value
    });
  render() {
    return (
      <Container>
        <Header setSearch={this.setSearch} />
        <Route
          exact
          path="/"
          render={() => <Main search={this.state.search} />}
        />
        <Route
          path="/favourites"
          render={() => <Favourites search={this.state.search} />}
        />
        <Route
          path="/forlater"
          render={() => <ForLater search={this.state.search} />}
        />
      </Container>
    );
  }
}
