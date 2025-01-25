const { v4: uuid } = require("uuid");
const { format } = require("date-fns");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logEvents = async (message, fileName) => {
  const dateTime = format(new Date(), "yyyy/MM/dd HH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", fileName),
      logItem
    );
  } catch (err) {
    console.log(err.message);
  }
};
const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.header.origin}\t${req.url}`, "reqLog.txt");
  next();
};
module.exports = { logger, logEvents };
