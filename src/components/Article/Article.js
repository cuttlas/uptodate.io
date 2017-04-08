import React, { Component } from "react";
import styled from "styled-components";
import { parse as parseUrl } from "url";

const Box = styled.div`
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

const Link = styled.a`
  text-decoration: none;
`;

const TextOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: ${props => props.expanded ? "100%" : "45%"};
  background: rgba(0, 0, 0, .70);
  bottom: 0;
  color: white;
  transition: height 0.35s ease;
`;

const Title = styled.p`
  color: white;
  padding: 15px 15px 0px 15px;
  margin: 0px;
  font-size: 0.75em;
  transition: height 0.45s ease;

  &:hover {
    color: lightblue;
  }

`;

const Description = styled.p`
  height: 85%;
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

const Host = styled.div`
  padding-left: 15px;
`;

const FavIcon = styled.img`
  display: inline-block;
  height: 10px;
  width: 10px;
  padding-right: 5px;
  vertical-align: middle;
`;

const HostName = styled.p`
  color: gray;
  display: inline-block;
  font-size: 0.7em;
  vertical-align: middle;
`;

const bgimages = [
  "https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/ExspEUkoliksz67w8/yellow-matrix-background_bjcisfg__M0000.jpg",
  "https://static.esea.net/global/images/users/679944.1458605905.jpg",
  "https://previews.123rf.com/images/mikekiev/mikekiev1109/mikekiev110900016/10628139-binary-stream-Stock-Photo-software-matrix-binary.jpg",
  "http://melissavandyke.com/wp-content/uploads/2015/09/code.jpg",
  "https://previews.123rf.com/images/iunewind/iunewind1602/iunewind160200027/52370654-Abstract-program-code-Screen-of-source-code-script-Vector-red-background-Stock-Vector.jpg"
];

class Article extends Component {
  state = {
    expanded: false
  };

  static propTypes = {
    article: React.PropTypes.shape({
      url: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      description: React.PropTypes.string,
      author: React.PropTypes.string
    })
  };

  toggleExpand = e => {
    this.setState(oldState => ({ expanded: !oldState.expanded }));
    e.stopPropagation();
  };

  render() {
    const { article } = this.props;
    if (!article) return null;

    const bgImg = bgimages[Math.floor(Math.random() * bgimages.length)];
    const url = parseUrl(article.url);
    const favicon = url.hostname === "github.com"
      ? "http://www.iconsplace.com/icons/preview/white/github-256.png"
      : `http://www.google.com/s2/favicons?domain=${url.hostname}`;

    return (
      <Box bgImg={bgImg} onClick={this.toggleExpand}>
        <TextOverlay expanded={this.state.expanded}>
          <Link href={article.url} target="_blank">
            <Title>
              {article.title.toUpperCase()}
            </Title>
          </Link>
          <Host>
            <FavIcon src={favicon} />
            <HostName> {url.hostname} </HostName>
          </Host>
          <Description
            show={this.state.expanded}
            dangerouslySetInnerHTML={{ __html: article.description }}
          />
        </TextOverlay>
      </Box>
    );
  }
}

export default Article;
