import styled from "styled-components";
import favouriteIcon from "img/favourite.svg";

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
  position: absolute;
  width: 100%;
  height: ${props => props.expanded ? "100%" : "45%"};
  background: rgba(0, 0, 0, .70);
  bottom: 0;
  color: white;
  transition: height 0.35s ease;
`;

export const Title = styled.p`
  color: white;
  padding: 15px 15px 0px 15px;
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
  padding: 0px 15px 0px 15px;
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
  padding-left: 15px;
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

export const Favourite = styled.i`
  padding: 0px 15px 0px 15px;
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 1s ease 0.20s;
  color: white;
  height: 30px;
  width: 30px;
`;
