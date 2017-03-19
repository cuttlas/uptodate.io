const schema = require('./schema');
const testData = require('./testData');
const graphql = require('graphql').graphql;

beforeEach(() => testData.initDB())
afterAll(() => testData.destroyDB());

it('should return all articles when there is not filter', async () => {
  const query = `{
    articles {
      id
      title
      imgUrl
      url
      date
      description
      newsletters {
        id
        name
      }
    }
  }`

  try {
    const res = await graphql(schema, query);
    const articles = res.data.articles;

    expect(articles.find(art => art.id == 2)).toEqual({
      id: 2,
      title: "JavaScript's Journey Through 2013",
      url: "http://www.javascript2.com",
      description: "The team at Telerik looks back at their predictions... ",
      date: "2017-01-03T23:00:00.000Z",
      imgUrl: null,
      newsletters: [
        { id: 1, name: 'javascriptWeekly' },
        { id: 2, name: 'reactNewsletter' }
      ]
    });
  } catch (e) {
    console.log(e);
  }
})