const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { generateToken } = require("./jsonwebtoken");
const User = require("../models/User");

// REGISTER ***********************
router.post("/register", async (req, res) => {
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(500).json({
      error: `User with email: (${req.body.email}) already exists, try again.`,
    });
  } else {
    try {
      // Capture user details
      const newUser = await new User({
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        password: hashedPassword,
      });
      // Create user, save him in the db and send response
      const savedUser = await newUser.save();
      return res
        .status(201)
        .json({ message: "User created successfully", savedUser });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
});

// LOGIN USER **************************
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res
        .status(404)
        .json(
          "User with the provided email doesnot exist, please create an account!"
        );
    }

    // Compare passwords and if password is incorrect, tell the user to try again
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json("Incorrect pasword, please try again!");
    }

    // Token payload
    const tokenPayload = {
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    // Hide password from returned data
    const { password, ...others } = user._doc;

    return res.status(200).json({
      message: "User login successful",
      ...others,
      token: generateToken(tokenPayload),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
