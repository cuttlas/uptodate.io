beforeEach(async () => {
  try {
    await require("./setupDb").populateDB();
  } catch (e) {
    console.log(e);
  }
});

afterEach(async () => {
  await require("./setupDb").destroyDB();
  await jest.resetModules();
});

it("should return the 10 first articles with all fields", async () => {
  const query = `{
    articles(first: 10) {
      edges {
        node {
          id 
          title 
          imgUrl
          url
          date
          favourite
          forLater
          description
          newsletters {
            id
            name
          }
        }
      }
    }
  }`;

  const schema = require("./schema");
  const graphql = require("graphql").graphql;
  const res = await graphql(
    schema,
    query,
    {},
    {
      state: {}
    }
  );

  const articles = res.data.articles.edges;

  expect(articles.length).toEqual(10);
  expect(articles.find(art => art.node.id == 2)).toEqual({
    node: {
      id: 2,
      title: "JavaScript's Journey Through 2013",
      url: "http://www.javascript2.com",
      description: "The team at Telerik looks back at their predictions... ",
      date: "2017-01-03T23:00:00.000Z",
      favourite: false,
      forLater: false,
      imgUrl: null,
      newsletters: [
        { id: 1, name: "javascriptWeekly" },
        { id: 2, name: "reactNewsletter" }
      ]
    }
  });
});

it("should return an nice error message when the db module fails", async () => {
  const articleRepo = require("./repos/articles");
  articleRepo.get = jest.fn(() => {
    throw new Error("unexpected exception");
  });

  const graphql = require("graphql").graphql;
  const schema = require("./schema");
  const query = `{
    articles {
      edges {
        node {
          id
        }
      }
    }
  }`;

  const res = await graphql(
    schema,
    query,
    {},
    {
      state: {}
    }
  );

  expect(res.data.articles).toBeNull();
  expect(res.errors[0].message).toEqual("unexpected exception");
});

it("should paginate correctly", async () => {
  const schema = require("./schema");
  const graphql = require("graphql").graphql;
  const query = `{
    articles(first: 6) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
        }
      }
    } 
  }`;

  let res = await graphql(
    schema,
    query,
    {},
    {
      state: {}
    }
  );

  expect(res.data.articles.pageInfo.hasNextPage).toEqual(true);
  expect(res.data.articles.edges.length).toEqual(6);

  const endCursor = res.data.articles.pageInfo.endCursor;
  const nextPageQuery = `{
    articles(first: 6, after: "${endCursor}") {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          id
          title
        }
      }
    }
  }`;

  res = await graphql(
    schema,
    nextPageQuery,
    {},
    {
      state: {}
    }
  );

  const articles = res.data.articles.edges;

  expect(res.data.articles.pageInfo.hasNextPage).toEqual(false);
  expect(articles.length).toEqual(4);
  expect(articles.find(art => art.node.id == 7)).toEqual({
    node: {
      id: 7,
      title: "JavaScript's Journey Through 2018"
    }
  });
});

it("should filter articles by title and description", async () => {
  const schema = require("./schema");
  const graphql = require("graphql").graphql;
  const query = `{
    articles(q: "2012") {
      edges {
        node {
          id
        }
      }
    } 
  }`;

  let res = await graphql(
    schema,
    query,
    {},
    {
      state: {}
    }
  );

  expect(res.data.articles.edges).toEqual([
    { node: { id: 1 } },
    { node: { id: 4 } }
  ]);
});

it("should paginate correctly when filtered", async () => {
  const schema = require("./schema");
  const graphql = require("graphql").graphql;
  const query = `{
    articles(q: "Telerik2", first: 3) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
        }
      }
    } 
  }`;

  let res = await graphql(
    schema,
    query,
    {},
    {
      state: {}
    }
  );

  expect(res.data.articles.edges).toEqual([
    { node: { id: 3 } },
    { node: { id: 4 } },
    { node: { id: 5 } }
  ]);

  const endCursor = res.data.articles.pageInfo.endCursor;
  const nextPageQuery = `{
    articles(q: "Telerik2", first: 2, after: "${endCursor}") {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
        }
      }
    } 
  }`;

  res = await graphql(
    schema,
    nextPageQuery,
    {},
    {
      state: {}
    }
  );

  expect(res.data.articles.edges).toEqual([{ node: { id: 6 } }]);
  expect(res.data.articles.pageInfo.hasNextPage).toEqual(false);
});

it("should set the forLater when there is a logged user", async () => {
  const schema = require("./schema");
  const graphql = require("graphql").graphql;
  const query = `{
    articles {
      edges {
        node {
          id
          forLater
        }
      }
    } 
  }`;

  let res = await graphql(
    schema,
    query,
    {},
    {
      state: {
        user: { id: 1 }
      }
    }
  );

  expect(res.data.articles.edges.length).toBe(10);
  expect(res.data.articles.edges[3].node).toEqual({
    id: 4,
    forLater: true
  });
  expect(res.data.articles.edges[5].node).toEqual({
    id: 6,
    forLater: false
  });
});

it("should set the favourite field when there is a logged user", async () => {
  const schema = require("./schema");
  const graphql = require("graphql").graphql;
  const query = `{
    articles {
      edges {
        node {
          id
          favourite
        }
      }
    } 
  }`;

  let res = await graphql(
    schema,
    query,
    {},
    {
      state: {
        user: { id: 1 }
      }
    }
  );

  expect(res.data.articles.edges.length).toBe(10);
  expect(res.data.articles.edges[1].node).toEqual({
    id: 2,
    favourite: true
  });
  expect(res.data.articles.edges[2].node).toEqual({
    id: 3,
    favourite: true
  });
  expect(res.data.articles.edges[5].node).toEqual({
    id: 6,
    favourite: false
  });
});

it("should return the logged user when exists", async () => {
  const schema = require("./schema");
  const graphql = require("graphql").graphql;
  const query = `{
    loggedUser {
      id
      nickname
    } 
  }`;

  let res = await graphql(
    schema,
    query,
    {},
    {
      state: {
        user: { id: 1, nickname: "user1" }
      }
    }
  );

  expect(res.data.loggedUser).toEqual({
    id: 1,
    nickname: "user1"
  });
});

it("should return null when there is no logged user", async () => {
  const schema = require("./schema");
  const graphql = require("graphql").graphql;
  const query = `{
    loggedUser {
      id
      nickname
    } 
  }`;

  let res = await graphql(
    schema,
    query,
    {},
    {
      state: {}
    }
  );

  expect(res.data.loggedUser).toBeNull();
});

it("should filter the forLater and favourites fields of the user", async () => {
  const schema = require("./schema");
  const graphql = require("graphql").graphql;
  const query = `{
    loggedUser {
      id
      nickname
      favourites (q: "2014") {
        edges {
          node {
            id
          }
        }
      }
      forLater (q: "2016"){
        edges {
          node {
            id
          }
        }
      }
    } 
  }`;

  let res = await graphql(
    schema,
    query,
    {},
    {
      state: {
        user: { id: 1, nickname: "user1" }
      }
    }
  );

  expect(res.data.loggedUser).toEqual({
    id: 1,
    nickname: "user1",
    favourites: { edges: [{ node: { id: 3 } }] },
    forLater: { edges: [] }
  });
});

it("should paginate the forLater and favourites fields of the user", async () => {
  const schema = require("./schema");
  const graphql = require("graphql").graphql;
  const query = `{
    loggedUser {
      id
      nickname
      favourites (first: 1) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
          }
        }
      }
      forLater (first: 10){
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
          }
        }
      }
    } 
  }`;

  let res = await graphql(
    schema,
    query,
    {},
    {
      state: {
        user: { id: 1, nickname: "user1" }
      }
    }
  );

  expect(res.data.loggedUser.favourites.edges).toEqual([{ node: { id: 2 } }]);
  expect(res.data.loggedUser.forLater.edges).toEqual([{ node: { id: 4 } }]);

  const nextPageQuery = `{
    loggedUser {
      favourites (first: 10, after: "${res.data.loggedUser.favourites.pageInfo.endCursor}") {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
          }
        }
      }
    } 
  }`;

  res = await graphql(
    schema,
    nextPageQuery,
    {},
    {
      state: {
        user: { id: 1, nickname: "user1" }
      }
    }
  );

  expect(res.data.loggedUser.favourites.edges).toEqual([{ node: { id: 3 } }]);
});

it("should return an error when trying to add a favourite with no user", async () => {
  const schema = require("./schema");
  const graphql = require("graphql").graphql;
  const mutation = `mutation {
    addFavourite(articleId: 4) {
      error
    }
  }`;

  const res = await graphql(
    schema,
    mutation,
    {},
    {
      state: {}
    }
  );

  expect(res.data.addFavourite.error).toEqual("Invalid User");
});

it("should return an error when trying to add a forLater with no user", async () => {
  const schema = require("./schema");
  const graphql = require("graphql").graphql;
  const mutation = `mutation {
    addForLater(articleId: 4) {
      error
    }
  }`;

  const res = await graphql(
    schema,
    mutation,
    {},
    {
      state: {}
    }
  );

  expect(res.data.addForLater.error).toEqual("Invalid User");
});

it("should return an error when trying to add a favourite that already exists", async () => {
  const schema = require("./schema");
  const graphql = require("graphql").graphql;
  const mutation = `mutation {
    addFavourite(articleId: 2) {
      error
    }
  }`;

  const res = await graphql(
    schema,
    mutation,
    {},
    {
      state: {
        user: { id: 1 }
      }
    }
  );

  expect(res.data.addFavourite.error).toEqual(
    "Article already added to favourites"
  );
});

it("should return an error when trying to add a forLater that already exists", async () => {
  const schema = require("./schema");
  const graphql = require("graphql").graphql;
  const mutation = `mutation {
    addForLater(articleId: 4) {
      error
    }
  }`;

  const res = await graphql(
    schema,
    mutation,
    {},
    {
      state: {
        user: { id: 1 }
      }
    }
  );

  expect(res.data.addForLater.error).toEqual(
    "Article already added to for later"
  );
});

it("should add a favourite", async () => {
  const schema = require("./schema");
  const graphql = require("graphql").graphql;
  const mutation = `mutation {
    addFavourite(articleId: 4) {
      error
    }
  }`;

  let res = await graphql(
    schema,
    mutation,
    {},
    {
      state: {
        user: { id: 1 }
      }
    }
  );

  expect(res.data.addFavourite.error).toBeNull();

  const query = `{
    loggedUser {
      favourites {
        edges {
          node {
            id
          }
        }
      }
    }
  }`;

  res = await graphql(
    schema,
    query,
    {},
    {
      state: {
        user: { id: 1 }
      }
    }
  );

  expect(res.data.loggedUser.favourites.edges).toEqual([
    { node: { id: 2 } },
    { node: { id: 3 } },
    { node: { id: 4 } }
  ]);
});

it("should add a for later", async () => {
  const schema = require("./schema");
  const graphql = require("graphql").graphql;
  const mutation = `mutation {
    addForLater(articleId: 3) {
      error
    }
  }`;

  let res = await graphql(
    schema,
    mutation,
    {},
    {
      state: {
        user: { id: 1 }
      }
    }
  );

  expect(res.data.addForLater.error).toBeNull();

  const query = `{
    loggedUser {
      forLater {
        edges {
          node {
            id
          }
        }
      }
    }
  }`;

  res = await graphql(
    schema,
    query,
    {},
    {
      state: {
        user: { id: 1 }
      }
    }
  );

  expect(res.data.loggedUser.forLater.edges).toEqual([
    { node: { id: 3 } },
    { node: { id: 4 } }
  ]);
});
