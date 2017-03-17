import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import logo from 'logo.svg';
import './App.css';
import Article from 'Components/Article/Article';

const query = gql`query getArticles {
  articles {
    id
    title
    description
    url
    date
    newsletters {
      name 
      id
    }
  }  
}`

class App extends Component {

  render() {
    const { articles } = this.props.data;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>WeWeekly</h2>
        </div>
        <div className="App-grid">
          {articles && articles.map((article, key) => <Article className="Article" article={article} key={key}/>)}
        </div>
      </div>
    );
  }
}

export default graphql(query)(App);
