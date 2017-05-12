knex seed:run --knexfile='../db/knexfile.js'
node ./scrapers/runScraper javascriptWeekly 318 333
node ./scrapers/runScraper reactjsNewsletter 57 72
node ./scrapers/runScraper ponyFoo 46 61
node ./scrapers/runScraper frontendFocus 163 179
node ./scrapers/runScraper cssWeekly 249 263
node ./scrapers/runPublisher 200