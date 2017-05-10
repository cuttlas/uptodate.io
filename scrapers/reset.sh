knex seed:run --knexfile='../db/knexfile.js'
node ./scrapers/runScraper javascriptWeekly 323 333
node ./scrapers/runScraper reactjsNewsletter 62 72
node ./scrapers/runScraper ponyFoo 51 61
node ./scrapers/runScraper frontendFocus 169 179
node ./scrapers/runScraper cssWeekly 253 263
node ./scrapers/runPublisher 200