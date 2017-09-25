knex seed:run --knexfile='./db/knexfile.js'
node ./scrapers/runScraper javascriptWeekly 343 353
node ./scrapers/runScraper reactjsNewsletter 75 85
node ./scrapers/runScraper ponyFoo 71 81
node ./scrapers/runScraper frontendFocus 298 308
node ./scrapers/runScraper cssWeekly 273 283
node ./scrapers/runPublisher 200