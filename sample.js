function log(t) {
  console.log(t);
}
// Os Module
let os = require("os");
log(os.type());
log(os.version());
log(os.homedir());

// global Variables

log(__dirname);
log(__filename);

// path
const path = require("path");
log(path.dirname(__filename));
log(path.basename(__filename));
log(path.extname(__filename));
log(path.parse(__filename));
