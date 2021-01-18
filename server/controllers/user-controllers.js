const bcrypt = require("bcrypt");
const User = require("../db/user-model");

createUser = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Oops! We didn't found anything",
    });
  }

  const user = new User(body);

  if (!user) {
    return res.status(400).json({ success: false, error: err });
  }

  user
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: user._id,
        message: "User created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "User not created!",
      });
    });
};

getUser = async (req, res) => {
  const { username, password } = req.body;

  await User.findOne({ username }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (user) {
      console.log(user);
      bcrypt.compare(req.body.password, user.password, (error, same) => {
        if (same) {
          return res.status(200).json({
            data: user,
          });
        } else {
          return res.status(400).json({ success: true, data: error });
        }
      });
    }
  }).catch((err) => console.log(err));
};

module.exports = { createUser, getUser };
