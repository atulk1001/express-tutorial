const fs = require("fs");
const path = require("path");
// The fs.readFile() function buffers the entire file.
// To minimize memory costs, when possible prefer streaming via fs.createReadStream()
fs.readFile(path.join(__dirname, "docs", "01.txt"), "utf8", (err, data) => {
  if (err) throw err;
  else console.log(data.toString());
});

fs.writeFile(
  path.join(__dirname, "docs", "02.txt"),
  "Hey, I am in !",
  (err) => {
    if (err) throw err;
    console.log("Write Complete");
    fs.appendFile(
      path.join(__dirname, "docs", "02.txt"),
      "\n\nAlways Here",
      (err) => {
        if (err) throw err;
        console.log("Append Complete");
      }
    );
  }
);
process.on("uncaughtException", (err) => {
  console.log(`uncaught Error err`, err);
});
