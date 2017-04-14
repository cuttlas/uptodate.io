import React from "react";
import config from "config";

import {
  Container,
  Logo,
  TwitterLogo,
  TwitterButton,
  StyledLink
} from "./styles";

function Header() {
  return (
    <Container>
      <StyledLink to="/"><Logo alt="logo" /></StyledLink>
      <StyledLink to="/favourites">
        YOUR FAVOURITES
      </StyledLink>
      <StyledLink to="/forlater">FOR LATER</StyledLink>
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
