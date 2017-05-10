const publisher = require("./publisher");
const moment = require("moment");

const interval = process.argv[2];

(async function() {
  let date = moment();
  let finished = false;
  while (!finished) {
    const res = await publisher(date.toDate(), true);
    if (!res) {
      finished = true;
      break;
    }
    date = date.subtract(interval, "minutes");
  }

  console.log("DONE");
  process.exit();
})();
