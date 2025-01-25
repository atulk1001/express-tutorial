const bcrypt = require("bcrypt");
const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleLogin = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password) {
    return res.status(400).json({
      message: "Username and Password required !",
    });
  }
  const foundUser = userDB.users.find((person) => person.username === user);
  if (!foundUser) {
    return res.sendStatus(401);
  }
  //evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    res.json({ success: `User ${user} is loggedin !` });
  } else {
    res.sendStatus(401);
  }
};
module.exports = { handleLogin };
