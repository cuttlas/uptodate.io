knex seed:run --knexfile='../knexfile.js'
node ./src/api/scrapers/runScraper javascriptWeekly 200 210
node ./src/api/scrapers/runScraper reactjsNewsletter 60 70
node ./src/api/scrapers/runPublisher 2017-02-01 5