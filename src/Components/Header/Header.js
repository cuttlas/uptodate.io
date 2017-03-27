import React from "react";
import styled from "styled-components";

import config from "config";

import logo from "img/logo.svg";
import twitterLogo from "img/twitter.png";

const Container = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: black;
  padding-right: 15px;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  height: 60px;
  content: url(${logo})
`;

const TwitterLogo = styled.img`
  height: 15px;
  margin-left: 5px;
  content: url(${twitterLogo})
`;

const TwitterButton = styled.a`
  height: 20px;
  padding: 5px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  border-radius: 5px;
  font-size: 0.7em;
  text-decoration: none;
`;

function Header() {
  return (
    <Container>
      <Logo src={logo} alt="logo" />
      <TwitterButton
        href={`http://${config.host}:${config.port}/connect/twitter`}
        target="_blank"
      >
        <p> Log In </p> <TwitterLogo />
      </TwitterButton>
    </Container>
  );
}

export default Header;
