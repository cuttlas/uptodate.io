import React, { Component } from "react";
import timeAgo from "node-time-ago";
import { parse as parseUrl } from "url";
import { truncate } from "utils/utils";
import { compose } from "react-apollo";
import {
  Box,
  ExpandIcon,
  TextOverlay,
  Title,
  Description,
  TitleDescriptionWrapper,
  Host,
  Link,
  Author,
  Actions,
  Action,
  ActionLabel,
  ActionLink,
  ActionIcon,
  FavIcon,
  HostName,
  Meta,
  Newsletter,
  NLComma,
  TimeAgo,
  LoginScreen,
  LoginMessage,
  LoginBack
} from "./styles";

import TwitterButton from "components/TwitterButton/TwitterButton";

import {
  addFavouriteMutation,
  addForLaterMutation,
  removeFavouriteMutation,
  removeForLaterMutation
} from "mutations";
import { userQuery } from "queries";

class Article extends Component {
  state = {
    expanded: false,
    login: false
  };

  static propTypes = {
    article: React.PropTypes.shape({
      url: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      description: React.PropTypes.string,
      author: React.PropTypes.string,
      addFavourite: React.PropTypes.func,
      addForLater: React.PropTypes.func,
      removeFavourite: React.PropTypes.func,
      removeForLater: React.PropTypes.func
    })
  };

  toggleExpand = e => {
    this.setState(oldState => ({ expanded: !oldState.expanded }));
    e.stopPropagation();
  };

  onClickTitle = e => {
    e.stopPropagation();
  };

  onClickFavourite = e => {
    e.stopPropagation();
    if (this.props.loggedUser)
      this.props.addFavourite(this.props.article.id);
    else
      this.setState({
        login: true,
        origin: "favourite"
      });
  };

  onClickUnfavourite = e => {
    e.stopPropagation();
    if (this.props.loggedUser)
      this.props.removeFavourite(this.props.article.id);
    else
      this.setState({
        login: true,
        origin: "favourite"
      });
  };

  onClickForLater = e => {
    e.stopPropagation();
    if (this.props.loggedUser)
      this.props.addForLater(this.props.article.id);
    else
      this.setState({
        login: true,
        origin: "forlater"
      });
  };

  onClickUnsave = e => {
    e.stopPropagation();
    if (this.props.loggedUser)
      this.props.removeForLater(this.props.article.id);
    else
      this.setState({
        login: true,
        origin: "forlater"
      });
  };

  loginBack = e => {
    e.stopPropagation();
    this.setState({
      login: false
    });
  };

  render() {
    const { article } = this.props;
    if (!article) return null;

    const bgImg = article.newsletters[0].imgUrl;
    const url = parseUrl(article.url);
    const favicon = url.hostname === "github.com"
      ? "http://balzer82.github.io/github.png"
      : `http://www.google.com/s2/favicons?domain=${url.hostname}`;

    const articleDetails = (
      <span>
        {this.state.expanded
          ? <ExpandIcon className="fa fa-angle-down" />
          : <ExpandIcon className="fa fa-angle-up" />}

        <TitleDescriptionWrapper>
          <Title
            expanded={this.state.expanded}
            onClick={this.onClickTitle}
            href={article.url}
            target="_blank"
          >
            {article.title.toUpperCase()}
          </Title>
          {article.author && <Author> {article.author}</Author>}
          <Host>
            <FavIcon src={favicon} />
            <HostName>
              {url.hostname}
            </HostName>
          </Host>
          <Description
            show={this.state.expanded}
            dangerouslySetInnerHTML={{
              __html: truncate(article.description, 275)
            }}
          />
        </TitleDescriptionWrapper>
        <Actions show={this.state.expanded}>
          <Action>
            <ActionLink
              onClick={this.onClickTitle}
              href={article.url}
              target="__blank"
            >
              <ActionIcon className="fa fa-eye" />
              {url.hostname === "youtube.com"
                ? <ActionLabel>Watch now</ActionLabel>
                : <ActionLabel>Read now</ActionLabel>}
            </ActionLink>
          </Action>
          {article.favourite
            ? <Action onClick={this.onClickUnfavourite}>
                <ActionIcon className="fa fa-star" />
                <ActionLabel>Unfavourite</ActionLabel>
              </Action>
            : <Action onClick={this.onClickFavourite}>
                <ActionIcon className="fa fa-star-o" />
                <ActionLabel>Favourite</ActionLabel>
              </Action>}
          {article.forLater
            ? <Action onClick={this.onClickUnsave}>
                <ActionIcon className="fa fa-bookmark" />
                <ActionLabel>Unsave</ActionLabel>
              </Action>
            : <Action onClick={this.onClickForLater}>
                <ActionIcon className="fa fa-bookmark-o" />
                <ActionLabel>For later</ActionLabel>
              </Action>}
        </Actions>
        <Meta>
          {article.newsletters.map((nl, key) => {
            const res = [
              <Newsletter
                onClick={this.onClickTitle}
                href={nl.url}
                target="_blank"
              >
                {nl.name}
              </Newsletter>
            ];
            if (article.newsletters.length > key + 1)
              res.push(<NLComma>, </NLComma>);
            return res;
          })}
          <TimeAgo> - {timeAgo(article.published)}</TimeAgo>
        </Meta>
      </span>
    );

    const login = (
      <LoginScreen onClick={this.loginBack}>
        <LoginMessage>
          {this.state.origin === "favourite"
            ? "Log in to save articles to your favourites"
            : "Log in to save articles for later"}
        </LoginMessage>
        <TwitterButton />
        <LoginBack>Go back to the article</LoginBack>
      </LoginScreen>
    );

    return (
      <Box bgImg={bgImg} onClick={this.toggleExpand}>
        <TextOverlay expanded={this.state.expanded || this.state.login}>
          {this.state.login ? login : articleDetails}
        </TextOverlay>
      </Box>
    );
  }
}

export default compose(
  userQuery,
  addFavouriteMutation,
  addForLaterMutation,
  removeFavouriteMutation,
  removeForLaterMutation
)(Article);
