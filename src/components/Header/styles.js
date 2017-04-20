import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  top: 0px;
  z-index: 3;
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
  color: ${props => props.theme.mainColor};
  font-size: 0.85em;
`;

export const LogoOut = styled.i`
  color: ${props => props.theme.mainColor};
  font-size: 1.8em;
`;

export const BrandName = styled.span`
  color: white;
  font-size: 0.8em;
  display: none;
  margin-left: 5px;

  @media(min-width: 550px) {
    display: inline;
  }
`;

export const SearchInput = styled.input`
  width: 30%;
  margin-right: auto;
  padding: 5px;
  border: solid 1px ${props => props.theme.mainColor};
`;

export const TO = styled.span`
  color: ${props => props.theme.mainColor};
`;

export const IO = styled.span`
  color: ${props => props.theme.mainColor};
  font-size: 1.1em;
`;

export const Icon = styled.div`
  padding-right: 5px;
`;

export const Actions = styled.div`
  margin: auto;
`;

export const Action = styled(Link)`
  margin-right: 10px;
  color: white;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.mainColor};
  }
`;

export const Logout = styled.a`
  color: white;
  font-size: 0.7em;
  margin-right: 15px;
  &:hover {
    text-decoration: underline;
    color: ${props => props.theme.mainColor};
    cursor: pointer;
  }
`;

export const SearchIcon = styled.i`
  font-size: 1.5em;
  margin-right: 7px;
  color: ${props => props.theme.mainColor};
  display: none;

  @media(min-width: 550px) {
    display: inline;
  }
`;

export const ActionIcon = styled.i`
  margin-right: 5px;
  color: ${props => props.theme.mainColor};
  font-size: 1.3em;

  @media(min-width: 550px) {
    font-size: 1em;
    display: inline;
  }
`;

export const ActionName = styled.span`
  font-size: 0.75em;
  display: none;

  @media(min-width: 550px) {
    display: inline;
  }
`;
