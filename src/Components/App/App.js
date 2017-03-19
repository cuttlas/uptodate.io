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
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: white;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Grid = styled.div`
  margin-top: 25px;
  display: flex;
  flex-wrap:wrap;
  justify-content: center;
`;


class App extends Component {
  static propTypes = {
    data: React.PropTypes.object
  }

  render() {
    const { articles } = this.props.data;

    return (
      <Container>
        <Header>
          <Logo src={logo} alt="logo" />
          <h2>WeWeekly</h2>
        </Header>
        <Grid>
          {articles && articles.map((article, key) => <Article className="Article" article={article} key={key} />)}
        </Grid>
      </Container>
    );
  }
}

export { App };
export default graphql(query)(App);
