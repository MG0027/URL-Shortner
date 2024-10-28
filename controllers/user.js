const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  
  console.log("User found in login:", user); // Log the user object.

  if (!user) {
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  }

  const token = setUser(user); // Generate JWT token
  res.cookie("token", token); // Set cookie with token
  console.log("Token set in cookie:", token); // Log the token

  return res.redirect("/"); // Redirect to home
}


  /*const sessionId = uuidv4();

  setUser(sessionId, user);
  res.cookie("uid", sessionId);
  return res.redirect("/");
*/


module.exports = {
  handleUserSignup,
  handleUserLogin,
};