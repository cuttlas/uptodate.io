knex seed:run --knexfile='../db/knexfile.js'
node ./scrapers/runScraper javascriptWeekly 200 210
node ./scrapers/runScraper reactjsNewsletter 60 70
node ./scrapers/runPublisher 2017-02-01 5