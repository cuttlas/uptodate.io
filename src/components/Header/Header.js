import React from "react";
import { remove } from "utils/storage";
import { withRouter } from "react-router";

import { userQuery } from "queries";

import TwitterButton from "components/TwitterButton/TwitterButton";

import {
  Container,
  LogoWrapper,
  Logo,
  SearchInput,
  BrandName,
  IO,
  TO,
  Logout,
  Actions,
  Action,
  ActionIcon,
  SearchIcon,
  ActionName
} from "./styles";

function Header({ loggedUser, loading, history }) {
  const logout = () => {
    remove("token");
    location.reload();
  };

  const search = e => {
    const value = e.target.value;
    history.push(`${location.pathname}?q=${value}`);
  };

  return (
    <Container>
      <LogoWrapper to="/">
        <Logo className="fa fa-align-center" />
        <BrandName>Up<TO>To</TO>Date<IO>.io</IO></BrandName>
      </LogoWrapper>
      <SearchIcon className="fa fa-search" />
      {!loading && <SearchInput placeholder="Search..." onKeyUp={search} />}
      {loggedUser &&
        !loading &&
        <Actions>
          <Action to="/favourites">
            <ActionIcon className="fa fa-star" />
            <ActionName>Favourites</ActionName>
          </Action>}

          <Action to="/forlater">
            <ActionIcon className="fa fa-bookmark" />
            <ActionName>For Later</ActionName>
          </Action>
        </Actions>}
      {(() => {
        if (!loading) {
          if (loggedUser) return <Logout onClick={logout}>Logout</Logout>;
          else return <TwitterButton />;
        }
      })()}
    </Container>
  );
}

export default userQuery(withRouter(Header));
