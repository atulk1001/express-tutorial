const bcrypt = require("bcrypt");
const path = require("path");
const fsPromises = require("fs").promises;
const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleNewUser = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password) {
    return res.status(400).json({
      message: "Username and Password are required",
    });
  }
  // check for duplicate

  const duplicate = userDB.users.find((person) => person.username === user);
  if (duplicate) {
    return res.sendStatus(409);
  }

  try {
    // encrypt the password
    const hasedPwd = await bcrypt.hash(password, 10);
    // store the new User
    const newUser = { username: user, password: hasedPwd };
    userDB.setUsers([...userDB.users, newUser]);
    console.log(newUser);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDB.users)
    );
    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
