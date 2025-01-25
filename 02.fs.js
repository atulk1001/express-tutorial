// fsPromise

const fsPromises = require("fs").promises;
const path = require("path");

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "docs", "01.txt"),
      "utf8"
    );
    console.log(data);
    await fsPromises.writeFile(
      path.join(__dirname, "docs", "promiseWrite.txt"),
      data
    );
    await fsPromises.appendFile(
      path.join(__dirname, "docs", "promiseWrite.txt"),
      "\n\nNice to here that\n\nWelcome to class"
    );
    await fsPromises.rename(
      path.join(__dirname, "docs", "promiseWrite.txt"),
      path.join(__dirname, "docs", "promiseComplete.txt")
    );
    const ndata = await fsPromises.readFile(
      path.join(__dirname, "docs", "promiseComplete.txt"),
      "utf8"
    );
    console.log(`\n${ndata}`);
  } catch (err) {
    console.log(err);
  }
};
fileOps();
