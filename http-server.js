const logEvents = require("./middleware/logEvents");
const EventEmitter = require("events");
const http = require("http");
const path = require("path");
const PORT = process.env.PORT || 3000;
class Emitter extends EventEmitter {}
const myEmitter = new Emitter();
//myEmitter.on("log", (msg) => logEvents(msg));

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  const extension = path.extname(req.url);
  let contentType;

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    default:
      contentType = "text/html";
  }
  console.log(contentType);
});
server.listen(PORT, () => console.log(`Server Running on Port : ${PORT}`));
