import styled from "styled-components";
import logo from "img/logo.svg";
import twitterLogo from "img/twitter.png";
import { Link } from "react-router-dom";

export const Container = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: black;
  padding-right: 15px;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.img`
  height: 60px;
  content: url(${logo})
`;

export const TwitterLogo = styled.img`
  height: 15px;
  margin-left: 5px;
  content: url(${twitterLogo})
`;

export const TwitterButton = styled.a`
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

export const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    color: lightblue;
  }
`;
