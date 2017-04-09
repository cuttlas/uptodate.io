const newsletters = [
  { id: 1, name: "javascriptWeekly" },
  { id: 2, name: "reactNewsletter" },
  { id: 3, name: "cssWeekly" }
];

const articles = [
  {
    id: 1,
    title: "JavaScript's Journey Through 2012",
    url: "http://www.javascript.com",
    description: "The team at Telerik looks back at their predictions... ",
    date: new Date(2017, 1, 14),
    img_url: null,
    author: null
  },
  {
    id: 2,
    title: "JavaScript's Journey Through 2013",
    url: "http://www.javascript2.com",
    description: "The team at Telerik looks back at their predictions... ",
    date: new Date(2016, 12, 4),
    img_url: null,
    author: null
  },
  {
    id: 3,
    title: "JavaScript's Journey Through 2014",
    url: "http://www.javascript3.com",
    description: "The team at Telerik looks back at their predictions... ",
    date: new Date(2016, 12, 4),
    img_url: null,
    author: null
  },
  {
    id: 4,
    title: "JavaScript's Journey Through 2015",
    url: "http://www.javascript4.com",
    description: "The team 2012 at Telerik looks back at their predictions... ",
    date: new Date(2016, 12, 4),
    img_url: null,
    author: null
  },
  {
    id: 5,
    title: "JavaScript's Journey Through 2016",
    url: "http://www.javascript5.com",
    description: "The team at Telerik looks back at their predictions... ",
    date: new Date(2016, 12, 4),
    img_url: null,
    author: null
  },
  {
    id: 6,
    title: "JavaScript's Journey Through 2017",
    url: "http://www.javascript6.com",
    description: "The team at Telerik looks back at their predictions... ",
    date: new Date(2016, 12, 4),
    img_url: null,
    author: null
  },
  {
    id: 7,
    title: "JavaScript's Journey Through 2018",
    url: "http://www.javascript7.com",
    description: "The team at Telerik looks back at their predictions... ",
    date: new Date(2016, 12, 4),
    img_url: null,
    author: null
  },
  {
    id: 8,
    title: "JavaScript's Journey Through 2019",
    url: "http://www.javascript8.com",
    description: "The team at Telerik looks back at their predictions... ",
    date: new Date(2016, 12, 4),
    img_url: null,
    author: null
  },
  {
    id: 9,
    title: "JavaScript's Journey Through 2020",
    url: "http://www.javascript9.com",
    description: "The team at Telerik looks back at their predictions... ",
    date: new Date(2016, 12, 4),
    img_url: null,
    author: null
  },
  {
    id: 10,
    title: "JavaScript's Journey Through 2021",
    url: "http://www.javascript10.com",
    description: "The team at Telerik looks back at their predictions... ",
    date: new Date(2016, 12, 4),
    img_url: null,
    author: null
  }
];

const articleNewsletter = [
  {
    article_id: 2,
    newsletter_id: 1
  },
  {
    article_id: 2,
    newsletter_id: 2
  },
  {
    article_id: 5,
    newsletter_id: 1
  }
];

const users = [
  {
    id: 1,
    nickname: "user1",
    password: "1234"
  },
  {
    id: 2,
    nickname: "user2",
    password: "2345"
  }
];

const favourites = [
  {
    user_id: 1,
    article_id: 2
  },
  {
    user_id: 1,
    article_id: 3
  },
  {
    user_id: 2,
    article_id: 4
  }
];

const forLater = [
  {
    user_id: 1,
    article_id: 4
  },
  {
    user_id: 2,
    article_id: 4
  },
  {
    user_id: 2,
    article_id: 1
  }
];

exports.articles = articles;
exports.newsletters = newsletters;
exports.articleNewsletter = articleNewsletter;
exports.users = users;
exports.favourites = favourites;
exports.forLater = forLater;
