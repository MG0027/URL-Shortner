const { getUser } = require("../service/auth");

/*async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) return res.redirect("/login");
  const user = getUser(userUid);

  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  const user = getUser(userUid);

  req.user = user;
  next();
} */

  async function checkAuth(req, res, next) {
    const token = req.cookies?.token; // Make sure this matches the cookie you set.
    req.user = null;
  
    console.log("Token in checkAuth:", token); // Log the token retrieved from cookies
  
    if (!token) return next(); // No token, proceed without a user
  
    try {
      const user = getUser(token); // Get the user from the token
      req.user = user; // Attach user info to req.user
      console.log("User set in req.user:", req.user); // Log the user info set in req.user
    } catch (error) {
      console.error("Error verifying token:", error); // Log any errors
    }
  
    next(); // Proceed to the next middleware
  }
  
  function restrictToLoggedinUserOnly(roles=[]) {
    return function(req, res, next) {
      if(!req.user)
       
        return res.redirect("/login");
      if(!roles.includes(req.user.role)) return res.end("unauthorized");
      return next();
    };
  
   
  }


module.exports = {
    restrictToLoggedinUserOnly,
  checkAuth,
};