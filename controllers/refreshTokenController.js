const jwt = require("jsonwebtoken");
require("dotenv").config();

const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  console.log(`cookies`, cookies);
  if (!cookies?.jwt) {
    return res.sendStatus(403); // Forbidden
  }
  const refreshToken = cookies.jwt;
  const foundUser = userDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  console.log(`foundUser`, foundUser);
  if (!foundUser) {
    return res.sendStatus(403); // Forbidden
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.user) {
      return res.sendStatus(403); // Forbidden
    }
    const accessToken = jwt.sign(
      { user: decoded.user },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.json({ accessToken });
  });
};
module.exports = { handleRefreshToken };
