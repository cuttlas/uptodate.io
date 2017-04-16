import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  top: 0px;
  z-index: 1;
  position: fixed;
  width: 100%;
  background-color: black;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const LogoWrapper = styled(Link)`
  margin: 0px auto 0px 15px;
  text-decoration: none;
`;

export const Logo = styled.i`
  margin-right: 5px;
  color: lightblue;
  font-size: 1.2em;
`;

export const BrandName = styled.span`
  color: white;
  font-size: 0.8em;
`;

export const SearchInput = styled.input`
  margin-right: auto;
`;

export const TO = styled.span`
  color: lightblue;
`;

export const IO = styled.span`
  color: lightblue;
  font-size: 1.1em;
`;

export const TwitterLogo = styled.i`
  color: #00aced;
  margin-left: 5px;
  font-size: 1.5em;
`;

export const Icon = styled.div`
  padding-right: 5px;
`;

export const TwitterButton = styled.a`
  height: 15px;
  margin: 0px 10px 0px 10px;
  padding: 5px;
  color: white;
  border: 1px solid white;
  border-radius: 5px;
  font-size: 0.7em;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Action = styled(Link)`
  margin-right: 30px;
  color: white;
  text-decoration: none;
  &:hover {
    color: lightblue;
  }
`;

export const Logout = styled.a`
  color: white;
  font-size: 0.7em;
  margin-right: 15px;
  &:hover {
    text-decoration: underline;
    color: lightblue;
    cursor: pointer;
  }
`;

export const ActionIcon = styled.i`
  margin-right: 5px;
  color: lightblue;
`;

export const ActionName = styled.span`
  font-size: 0.75em;
`;
