import React, { Component } from "react";
import { parse as parseUrl } from "url";
import {
  Box,
  TextOverlay,
  Title,
  Description,
  Host,
  Link,
  Favourite,
  FavIcon,
  HostName
} from "./styles";

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
      ? "http://www.iconsdb.com/icons/preview/white/github-10-xxl.png"
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
          <Favourite className="fa fa-star-o" show={this.state.expanded} />
        </TextOverlay>
      </Box>
    );
  }
}

export default Article;
