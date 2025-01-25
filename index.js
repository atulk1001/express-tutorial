const logEvents = require("./middleware/logEvents");
const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.on("log", (msg) => logEvents(msg));

setInterval(() => {
  myEmitter.emit("log", "Log event emitted!");
}, 5000);
