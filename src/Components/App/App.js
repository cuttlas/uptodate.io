import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import styled from 'styled-components';

import logo from 'logo.svg';
import Article from 'Components/Article/Article';

const query = gql`query getArticles {
  articles {
    id
    title
    description
    url
    imgUrl
    date
    newsletters {
      name 
      id
    }
  }  
}`

const Container = styled.div`
  text-align: center;
`;

const Logo = styled.img`
  height: 80px;
`;

const Header = styled.div`
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap:wrap;
  justify-content: center;
`;


class App extends Component {

  render() {
    const { articles } = this.props.data;

    return (
      <Container>
        <Header>
          <Logo src={logo} alt="logo" />
          <h2>WeWeekly</h2>
        </Header>
        <Grid>
          {articles && articles.map((article, key) => <Article className="Article" article={article} key={key}/>)}
        </Grid>
      </Container>
    );
  }
}

export { App };
export default graphql(query)(App);
