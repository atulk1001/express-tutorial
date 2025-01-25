const fs = require("fs");
const path = require("path");
const rs = fs.createReadStream(path.join(__dirname, "docs", "02.txt"), {
  encoding: "utf8",
});
const ws = fs.createWriteStream(path.join(__dirname, "docs", "03.txt"));
rs.on("data", (chunkedData) => {
  for (let i = 0; i < 1000000; i++) {
    ws.write(chunkedData);
  }
  ws.write(chunkedData);
});
