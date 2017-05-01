const publisher = require("./publisher");
const moment = require("moment");

const initDate = moment(process.argv[2]);
const perDay = process.argv[3];

(async function() {
  let date = initDate;
  let finished = false;
  while (!finished) {
    for (let i = 0; i < perDay; i++) {
      const res = await publisher(date.toDate());
      if (!res) {
        finished = true;
        break;
      }
      date = date.add(1, "second");
    }
    console.log(`Finished day ${date}`);
    date = date.add(1, "day");
  }

  console.log("DONE");
  process.exit();
})();
