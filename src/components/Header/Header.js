import React from "react";
import config from "config";
import logo from "img/logo.svg";
import { remove } from "utils/storage";
import { Route } from "react-router";

import { mainQuery, favouritesQuery, forLaterQuery } from "queries";

import {
  Container,
  LogoWrapper,
  Logo,
  SearchInput,
  BrandName,
  IO,
  TO,
  Icon,
  TwitterLogo,
  TwitterButton,
  Logout,
  Action,
  ActionIcon,
  ActionName
} from "./styles";

function Header({ loggedUser, loading, setSearch }) {
  const logout = () => {
    remove("token");
    location.reload();
  };

  const search = e => {
    const value = e.target.value;
    setSearch(value);
  };
  return (
    <Container>
      <LogoWrapper to="/">
        <Logo className="fa fa-align-center" />
        <BrandName>Up<TO>To</TO>Date<IO>.io</IO></BrandName>
      </LogoWrapper>
      <Route
        path="/favourites"
        render={() => (
          <SearchInput
            placeholder="Search your favourites articles..."
            onKeyUp={search}
          />
        )}
      />
      <Route
        path="/forlater"
        render={() => (
          <SearchInput
            placeholder="Search your saved articles..."
            onKeyUp={search}
          />
        )}
      />
      <Route
        path="/"
        exact={true}
        render={() => (
          <SearchInput placeholder="Search articles..." onKeyUp={search} />
        )}
      />

      {!loading &&
        loggedUser &&
        <Action to="/favourites">
          <ActionIcon className="fa fa-star" />
          <ActionName>Favourites</ActionName>
        </Action>}
      {!loading &&
        loggedUser &&
        <Action to="/forlater">
          <ActionIcon className="fa fa-bookmark" />
          <ActionName>For Later</ActionName>
        </Action>}
      {(() => {
        if (!loading) {
          if (loggedUser)
            return <Logout onClick={logout}>Logout</Logout>;
          else
            return (
              <TwitterButton
                href={`http://${config.host}:${config.port}/connect/twitter`}
                target="_blank"
              >
                <p>Log In</p> <TwitterLogo className="fa fa-twitter" />
              </TwitterButton>
            );
        }
      })()}
    </Container>
  );
}

export default mainQuery(Header);
