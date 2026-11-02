// Replace this file with custom middleware functions, including authentication and rate limiting
const jwt = require ("jsonwebtoken");
const Users = require ("../models/userModel");

auth = async (req, res, next) => {
    // Check if user is authenticated
    //console.log ("In auth mddleware");
    try {
      const token = req.cookies.jwt;
      if (!token) {
        return res.status(401).json("Authentication Failed.  Please login!");
      }
      //console.log ("secret key", process.env.JWT_SECRET);
      const decoded = jwt.verify (token, process.env.JWT_SECRET)
      //console.log ("jwt userId : ", decoded.id);
      const user = await Users.findById (decoded.id);
      if (!user) {
        return res.status (404).json ("Authentication failed. User Not Found! Please login!");
      }

      console.log ("In Auth username: ", user.username);
      req.user = user;

      next();
  }
  catch (error) {
    return res.status (500).json (`Error while Authenticating User.  Error: ${error.message}`);
  }
};

  module.exports = {auth};