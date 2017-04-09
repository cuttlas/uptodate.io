const testData = require("./testData");
const setupDB = require("./setupDb");

beforeEach(async () => {
  await jest.resetModules();
  await setupDB.populateDB();
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
      title: "JavaScript's Journey Through 2013"
    }
  });
});

fit("should filter articles by title and description", async () => {
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
