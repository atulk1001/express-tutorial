const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const PORT = process.env.PORT || 3500;

// custom middleware logger for logging http request
app.use(logger);

//Cross Origin Resource Sharing, a Third party middleware

app.use(cors(corsOptions));
// inbuilt middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));

// Web Page routes
app.get("^/$|home|index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

app.get("/aboutus", (req, res) => {
  res.redirect(301, "/about");
});

app.get(
  "/hello",
  (req, res, next) => {
    console.log(`attempted to say hello`);
    next();
  },
  (req, res) => {
    res.send("Hello World !");
  }
);

// API Routes
app.use("/register", require("./routes/api/register"));
app.use("/auth", require("./routes/api/auth"));
app.use("/refresh", require("./routes/api/refresh"));
app.use(verifyJWT); // middleware to verify JWT
app.use("/employees", require("./routes/api/emplyoees"));

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.use(errorHandler);

//listening to port
app.listen(PORT, () => console.log(`Server running on port, ${PORT}`));
