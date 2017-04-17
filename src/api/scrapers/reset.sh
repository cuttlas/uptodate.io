knex seed:run --knexfile='../knexfile.js'
node runScraper javascriptWeekly 200 210
node runScraper reactjsNewsletter 60 70
node runPublisher 2017-02-01 5