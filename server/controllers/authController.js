const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("../db");

const signup = (req, res) => {
  const { username, email, password } = req.body;

  // Check if user already exists
  pool.query("SELECT * FROM users WHERE email = ?", [email], (err, rows) => {
    if (err) {
      console.error("Error in signup:", err);
      return res.status(500).send({ message: "Internal Server Error" });
    }

    if (rows.length > 0) {
      return res.json({ message: "This e-mail is already in use" });
    }

    // Hash the password
    bcrypt.hash(password, Number(process.env.SALT), (err, hashedPassword) => {
      if (err) {
        console.error("Error in hashing password:", err);
        return res.status(500).send({ message: "Internal Server Error" });
      }

      // Insert new user into the database
      pool.query(
        "INSERT INTO users (username, email, userPassword) VALUES (?, ?, ?)",
        [username, email, hashedPassword],
        (err) => {
          if (err) {
            console.error("Error in inserting user:", err);
            return res.status(500).send({ message: "Internal Server Error" });
          }

          return res.send({ message: "User Created" });
        }
      );
    });
  });
};

function login(req, res) {
  const { email, password } = req.body;
  // Find user by email
  pool.query("SELECT * FROM users WHERE email = ?", [email], (err, rows) => {
    if (err) {
      console.error("Error in login:", err);
      return res.status(500).send({ message: "Internal Server Error" });
    }

    // Check if rows is not empty and contains the user object
    if (!rows || !rows.length) {
      console.log("User not found for email:", email);
      return res.json({ message: "User doesn't exist" });
    }

    const user = rows[0]; // Access the first row directly
    // Validate password
    const isVerifed = bcrypt.compare(password, user.userPassword);
    if (!isVerifed) return res.jseon({ message: "Wrong Credentials" });

    // Generate JWT token
    const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);

    const userWoPassword = {
      _id: user.id,
      email: user.email,
      username: user.username,
      photoURL: user.photoURL,
    };

    return res
      .cookie("access_token", token, {
        expires: new Date(Date.now() + 30 * 24 * 3600000),
        httpOnly: true,
      })
      .json({ message: "Logged In successfully", userWoPassword });
  });
}

function google(req, res) {
  const { username, email, photoURL } = req.body;

  // Check if user already exists
  pool.query("SELECT * FROM users WHERE email = ?", [email], (err, rows) => {
    if (err) {
      console.error("Error in google:", err);
      return res.status(500).send({ message: "Internal Server Error" });
    }

    if (rows.length > 0) {
      const user = rows[0];
      const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
      const userWoPassword = {
        _id: user.id,
        email: user.email,
        username: user.username,
        photoURL: user.photoURL,
      };

      return res
        .cookie("access_token", token, {
          expires: new Date(Date.now() + 30 * 24 * 3600000),
          httpOnly: true,
        })
        .json({ message: "Logged In successfully", userWoPassword });
    }

    // Generate random password
    const password = Math.random().toString(36).substring(2);

    // Hash the password
    bcrypt.hash(password, Number(process.env.SALT), (err, hashedPassword) => {
      if (err) {
        console.error("Error in hashing password:", err);
        return res.status(500).send({ message: "Internal Server Error" });
      }

      // Insert new user into the database
      pool.query(
        "INSERT INTO users (username, email, userPassword, photoURL) VALUES (?, ?, ?, ?)",
        [username, email, hashedPassword, photoURL],
        (err, result) => {
          if (err) {
            console.error("Error in inserting user:", err);
            return res.status(500).send({ message: "Internal Server Error" });
          }

          const newUser = {
            id: result.insertId,
            email,
            username,
            photoURL,
          };

          // Generate JWT token
          const token = jwt.sign({ _id: newUser.id }, process.env.TOKEN_SECRET);
          const userWoPassword = {
            _id: newUser.id,
            email: newUser.email,
            username: newUser.username,
            photoURL: newUser.photoURL,
          };

          return res
            .cookie("access_token", token, {
              expires: new Date(Date.now() + 30 * 24 * 3600000),
              httpOnly: true,
            })
            .json({
              message: "User Created and Logged In successfully",
              userWoPassword,
            });
        }
      );
    });
  });
}

const logOut = (req, res) => {
  return res.clearCookie("access_token").json({ message: "Logged Out" });
};

module.exports = {
  signup,
  login,
  google,
  logOut,
};
