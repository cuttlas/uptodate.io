import styled from "styled-components";

export const Box = styled.div`
  display: inline-block;
  margin-left: 5px;
  width: 98vw;
  height: 60vw;
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
    height: 29vw;
  }
  @media (min-width:1100px) { 
    width: 24.5vw;
    height: 19vw;
  }
  @media (min-width:1500px) {
    width: 19.6vw;
    height: 16vw; 
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
  margin: 0;
  height: 40%;
  opacity: ${props => props.show ? 1 : 0};
  font-size: 0.75em;
  text-align: left;
  transition: opacity 1s ease 0.20s;
  overflow: hidden;
  text-overflow-multiline: ellipsis;

  a {
    color: white;
    &:hover {
      color: lightblue;
    }
  }
`;

export const Author = styled.p`
  color: gray;
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
  left: 0;
  width: 100%;
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 1s ease 0.20s;
  color: white;
  display: flex;
  justify-content:center;
  position:absolute; 
  margin-bottom: 15px;
`;

export const Action = styled.div`
  text-align: center;

  &:hover {
    color: lightblue;
    > p {
      opacity: 1;
    }
  }
  + div {
    margin-left: 30px;
  }
`;

export const ActionLabel = styled.p`
  opacity: 0;
  transition: opacity 0.4s ease;
  font-size: 0.75em;
  margin: 0px;
`;

export const ActionIcon = styled.i`
  font-size: 1.8em;
`;
