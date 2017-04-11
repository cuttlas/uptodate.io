import styled from "styled-components";

export const Box = styled.div`
  display: inline-block;
  margin-left: 5px;
  width: 98vw;
  height: 50vw;
  position: relative;
  background: url(${props => props.bgImg}) no-repeat;
  background-size: cover;

  &:hover {
    cursor: pointer;
  }

  @media (min-width:500px)  { 
    width: 48.9vw;
    height: 41vw;
  }
  @media (min-width:800px)  { 
    width: 32.6vw;
    height: 25vw;
  }
  @media (min-width:1100px) { 
    width: 24.5vw;
    height: 16vw;
  }
  @media (min-width:1500px) {
    width: 19.6vw;
    height: 12vw; 
  }  
`;

export const Link = styled.a`
  text-decoration: none;
`;

export const TextOverlay = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  padding: 15px;
  height: ${props => props.expanded ? "100%" : "45%"};
  background: rgba(0, 0, 0, .70);
  bottom: 0;
  color: white;
  transition: height 0.35s ease;
`;

export const Title = styled.p`
  color: white;
  margin: 0px;
  font-size: 0.75em;
  transition: height 0.45s ease;

  &:hover {
    color: lightblue;
  }

`;

export const Description = styled.p`
  height: 35%;
  opacity: ${props => props.show ? 1 : 0};
  font-size: 0.75em;
  text-align: left;
  transition: opacity 1s ease 0.20s;

  a {
    color: white;
    &:hover {
      color: lightblue;
    }
  }
`;

export const Host = styled.div`
`;

export const FavIcon = styled.img`
  display: inline-block;
  height: 10px;
  width: 10px;
  padding-right: 5px;
  vertical-align: middle;
`;

export const HostName = styled.p`
  color: gray;
  display: inline-block;
  font-size: 0.7em;
  vertical-align: middle;
`;

export const Actions = styled.div`
  bottom: 0;
  width: 100%;
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 1s ease 0.20s;
  color: white;
  display: flex;
  justify-content: center;
`;

export const Action = styled.div`
  text-align: center;

  &:hover {
    color: lightblue;
  }
  + div {
    margin-left: 20px;
  }
`;

export const ActionLabel = styled.p`
  font-size: 0.7em;
  margin: 0px;
`;
