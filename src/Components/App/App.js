import React, { Component } from 'react';
import logo from 'logo.svg';
import './App.css';
import Article from 'Components/Article/Article';

const articles = ["aowef", "weafawef", "fawewfea", "fawefaw", "fawefwaef", "wefwefwaf", "waefawef", "esfawef"];

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>WeWeekly</h2>
        </div>
        <div className="App-grid">
          {articles.map((article, key) => <Article className="Article" title={article} key={key}/>)}
        </div>
      </div>
    );
  }
}

export default App;
