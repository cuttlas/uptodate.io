import React from "react";
import { remove } from "utils/storage";
import { withRouter } from "react-router";

import { userQuery } from "queries";

import debounce from "debounce";
import TwitterButton from "components/TwitterButton/TwitterButton";

import {
  Container,
  LogoWrapper,
  Logo,
  LogoOut,
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

const logout = location => {
  remove("token");
  location.reload();
};

const search = debounce(
  (e, location, history) => {
    const value = e.target.value;
    history.push(`${location.pathname}?q=${value}`);
  },
  700
);

const onChange = (location, history, e) => {
  e.persist();
  search(e, location, history);
};

function Header({ loggedUser, loading, history }) {
  return (
    <Container>
      <LogoWrapper to="/">
        <span className="fa-stack">
          <LogoOut className="fa fa-circle-thin fa-stack-1x" />
          <Logo className="fa fa-align-center fa-stack-1x" />
        </span>
        <BrandName>Up<TO>To</TO>Date<IO>.io</IO></BrandName>
      </LogoWrapper>
      <SearchIcon className="fa fa-search" />
      {!loading &&
        <SearchInput
          placeholder="Search..."
          onKeyUp={onChange.bind(this, location, history)}
        />}
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
          if (loggedUser)
            return (
              <Logout onClick={logout.bind(this, location)}>Logout</Logout>
            );
          else
            return <TwitterButton />;
        }
      })()}
    </Container>
  );
}

export default userQuery(withRouter(Header));
