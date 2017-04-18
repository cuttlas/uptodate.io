import styled from "styled-components";

export const Box = styled.div`
  display: inline-block;
  margin-left: 5px;
  width: 94vw;
  height: 60vw;
  position: relative;
  background: url(${props => props.bgImg}) no-repeat;
  background-size: cover;
  border: 1px solid black;

  @media (min-width:575px)  { 
    width: 47.8vw;
    height: 41vw;
  }
  @media (min-width:925px)  { 
    width: 32.6vw;
    height: 30vw;
  }
  @media (min-width:1300px) { 
    width: 24.2vw;
    height: 19vw;
  }
  @media (min-width:1800px) {
    width: 19.4vw;
    height: 16vw; 
  }  
`;

export const ExpandIcon = styled.i`
  position: absolute;
  right: 10px;
  top: 12px;
  color: gray;
  font-size: 1.3em;
  &:hover {
    cursor: pointer;
  }
`;

export const Link = styled.a`
  text-decoration: none;
  display: block;
  max-width: 85%;
`;

export const TextOverlay = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  padding: 15px 15px 15px 15px;
  height: ${props => props.expanded ? "100%" : "50%"};
  background: rgba(0, 0, 0, .70);
  bottom: 0;
  color: white;
  transition: height 0.35s ease;
`;

export const Title = styled.p`
  color: white;
  margin: 0px 0px 5px 0px;
  font-size: 0.85em;
  transition: height 0.45s ease;

  &:hover {
    color: ${props => props.theme.mainColor};
  }

`;

export const Description = styled.p`
  margin: 0px;
  height: 40%;
  opacity: ${props => props.show ? 1 : 0};
  font-size: 0.85em;
  text-align: left;
  transition: opacity 1s ease 0.20s;
  overflow: hidden;

  a {
    color: white;
    &:hover {
      color: ${props => props.theme.mainColor};
    }
  }
`;

export const Author = styled.span`
  margin-right: 10px;
  color: gray;
  font-size: 0.75em;
  color: ${props => props.theme.mainColor};
`;

export const Newsletter = styled.a`
  color: gray;
  font-size: 0.75em;
  text-decoration: none;
  &:hover {
    cursor: pointer;  
    color: ${props => props.theme.mainColor};
  }
`;

export const NLComma = styled.span`
  color: gray;
  font-size: 0.75em; 
`;

export const TimeAgo = styled.span`
  color: gray;
  font-size: 0.75em;
  margin: 0px;
`;

export const Host = styled.div`
  margin: 0px 0px 10px 0px;
  display: inline-block;
`;

export const Meta = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 10px;
  right:10px;
`;

export const FavIcon = styled.img`
  display: inline-block;
  height: 10px;
  width: 10px;
  padding-right: 5px;
  vertical-align: middle;
`;

export const HostName = styled.p`
  margin: 0px;
  color: ${props => props.theme.mainColor};
  display: inline-block;
  font-size: 0.7em;
  vertical-align: middle;
`;

export const Actions = styled.div`
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 1s ease 0.20s;
  color: white;
  display: flex;
  justify-content:center;
`;

export const Action = styled.div`
  text-align: center;

  + div {
    margin-left: 40px;
  }

  &:hover {
    color: ${props => props.theme.mainColor};
    cursor: pointer;
  }
`;

export const ActionLabel = styled.p`
  font-size: 0.75em;
  margin: 0px;
`;

export const ActionIcon = styled.i`
  font-size: 1.6em;
`;

export const ActionLink = styled.a`
  color: white;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.mainColor};
    cursor: pointer;
  }
`;
