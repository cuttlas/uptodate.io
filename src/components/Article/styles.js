import styled from "styled-components";

const scrollBarSize = () => {
  const scrollDiv = document.createElement("div");
  scrollDiv.className = "scrollbar-measure";
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  console.log("Scrollbar width: ", scrollbarWidth);
  return scrollbarWidth;
};

const between = (from, to, fromVPWidth, toVPWidth) => {
  const ratio = (to - from) / (toVPWidth - fromVPWidth);
  const base = from - fromVPWidth * ratio;

  return `calc(${base}px + 100vw * ${ratio})`;
};

const marginLeft = 3;
const marginRight = 3;
const margin = marginLeft + marginRight + 2 + scrollBarSize();

const break1 = 550;
const break2 = 950;
const break3 = 1350;
const break4 = 1750;

const maxHeight = 325;
const minHeight = 275;

export const Box = styled.div`
  display: inline-block;
  position: relative;
  margin: 0px ${marginLeft}px 0px ${marginRight}px;
  width: calc(100vw - ${margin}px);
  height: ${between(maxHeight, minHeight, 1, break1)};
  background: url(${props => props.bgImg}) no-repeat;
  background-size: cover;
  border: 1px solid black;
  text-align: left;

  @media (min-width:${break1}px)  { 
    width: calc((100vw - ${margin * 2}px) / 2);
    height: ${between(maxHeight, minHeight, break1, break2)};
  }
  @media (min-width:${break2}px)  { 
    width: calc((100vw - ${margin * 3}px) / 3);
    height: ${between(maxHeight, minHeight, break2, break3)};
  }
  @media (min-width:${break3}px) { 
    width: calc((100vw - ${margin * 4}px) / 4);
    height: ${between(maxHeight, minHeight, break3, break4)};
  }
  @media (min-width:${break4}px) {
    width: calc((100vw - ${margin * 5}px) / 5);
    height: ${between(maxHeight, minHeight, break4, 3000)};
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

export const TextOverlay = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  padding: 15px 15px 15px 15px;
  height: ${props => props.expanded ? "100%" : "45%"};
  background: rgba(0, 0, 0, .70);
  bottom: 0;
  color: white;
  transition: height 0.35s ease;
`;

export const Title = styled.a`
  display: block;
  text-decoration: none;
  color: white;
  margin: 0px 0px 5px 0px;
  font-size: 0.85em;
  transition: height 0.45s ease;
  max-width: 85%;
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
  margin-right: 5px;
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
    margin-left: 30px;
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

export const LoginScreen = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LoginMessage = styled.span`
  color: white;
  text-align: center;
  margin-bottom: 15px;
`;

export const LoginBack = styled.span`
  font-size: 0.9em;
  color: gray;
  margin-top: 15px;
  &:hover {
    cursor: pointer;
    color: ${props => props.theme.mainColor};
  }
`;
