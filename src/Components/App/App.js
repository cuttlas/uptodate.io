import React, { Component } from 'react';
import logo from 'logo.svg';
import './App.css';
import Article from 'Components/Article/Article';

const articles = [{
  title: "JavaScript's Journey Through 2012",
  url: "http://developer.telerik.com/topics/web-development/javascripts-journey-2016/?utm_source=javascriptweekly&utm_medium=email",
  description: "The team at Telerik looks back at their predictions for JavaScript in 2016 and then ahead at what we might expect for the language in 2017",
  img: "http://www.w3devcampus.com/wp-content/uploads/logoAndOther/logo_JavaScript.png"
}, {
  title: "JavaScript's Journey Through 2017",
  url: "http://developer.telerik.com/topics/web-development/javascripts-journey-2016/?utm_source=javascriptweekly&utm_medium=email",
  description: "The team at Telerik looks back at their predictions for JavaScript in 2016 and then ahead at what we might expect for the language in 2017",
  img: "http://www.w3devcampus.com/wp-content/uploads/logoAndOther/logo_JavaScript.png"
}, {
  title: "JavaScript's Journey Through 2016",
  url: "http://developer.telerik.com/topics/web-development/javascripts-journey-2016/?utm_source=javascriptweekly&utm_medium=email",
  description: "The team at Telerik looks back at their predictions for JavaScript in 2016 and then ahead at what we might expect for the language in 2017",
  img: "http://www.w3devcampus.com/wp-content/uploads/logoAndOther/logo_JavaScript.png"
}, {
  title: "JavaScript's Journey Through 2016",
  url: "http://developer.telerik.com/topics/web-development/javascripts-journey-2016/?utm_source=javascriptweekly&utm_medium=email",
  description: "The team at Telerik looks back at their predictions for JavaScript in 2016 and then ahead at what we might expect for the language in 2017",
  img: "http://www.w3devcampus.com/wp-content/uploads/logoAndOther/logo_JavaScript.png"
}, {
  title: "JavaScript's Journey Through 2016",
  url: "http://developer.telerik.com/topics/web-development/javascripts-journey-2016/?utm_source=javascriptweekly&utm_medium=email",
  description: "The team at Telerik looks back at their predictions for JavaScript in 2016 and then ahead at what we might expect for the language in 2017",
  img: "http://www.w3devcampus.com/wp-content/uploads/logoAndOther/logo_JavaScript.png"
}, {
  title: "JavaScript's Journey Through 2016",
  url: "http://developer.telerik.com/topics/web-development/javascripts-journey-2016/?utm_source=javascriptweekly&utm_medium=email",
  description: "The team at Telerik looks back at their predictions for JavaScript in 2016 and then ahead at what we might expect for the language in 2017",
  img: "http://www.w3devcampus.com/wp-content/uploads/logoAndOther/logo_JavaScript.png"
}, {
  title: "JavaScript's Journey Through 2016",
  url: "http://developer.telerik.com/topics/web-development/javascripts-journey-2016/?utm_source=javascriptweekly&utm_medium=email",
  description: "The team at Telerik looks back at their predictions for JavaScript in 2016 and then ahead at what we might expect for the language in 2017",
  img: "http://www.w3devcampus.com/wp-content/uploads/logoAndOther/logo_JavaScript.png"
}, {
  title: "JavaScript's Journey Through 2016",
  url: "http://developer.telerik.com/topics/web-development/javascripts-journey-2016/?utm_source=javascriptweekly&utm_medium=email",
  description: "The team at Telerik looks back at their predictions for JavaScript in 2016 and then ahead at what we might expect for the language in 2017",
  img: "http://www.w3devcampus.com/wp-content/uploads/logoAndOther/logo_JavaScript.png"
}];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles,
    }
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>WeWeekly</h2>
        </div>
        <div className="App-grid">
          {this.state.articles.map((article, key) => <Article className="Article" article={article} key={key}/>)}
        </div>
      </div>
    );
  }
}

export default App;
