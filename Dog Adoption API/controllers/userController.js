// Replace this file with the logic for handling incoming requests and returning responses to the client

const Users = require ("../models/userModel");
const jwt = require ("jsonwebtoken");
const bcrypt = require ("bcrypt");


exports.login = async (req, res) => {

    try {
        const {username, password} = req.body;
        if (!username || !password) {
            return res.status (400).json ("Login Failed! username and password are required.")
        }
        const user = await Users.findOne ({username});
        
        if (user) {
            //console.log ("user retrieved...")
            //console.log ("User retrieved: ", user.username, " password: ", user.password);
            const isMatch = await bcrypt.compare (password, user.password);
            //console.log("Password match:", isMatch);
            
            if (isMatch) {
                //get JWT
                const token = jwt.sign ({id: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_MAX_AGE});
                //send JWT as cookie
                res.cookie ("jwt", token, {httpOnly: true, maxAge: process.env.COOKIE_MAX_AGE});
                //console.log ("JWT : ", token, " jwtCookie : ", res.getHeader("Set-Cookie"));
                return res.status (200).json("Login Successful!");
            }
            else {
                return res.status(401).json("Invalid password.  Login Failed!");
            }
        }
        else {
            //console.log ("user not retrieved")
            return res.status(401).json("Error :  Invalid username");
            
        }
    }
    catch (error) {
        return res.status (500).json (`Error during login! Error: ${error}`);
    }
    
}

exports.registerUser = async (req, res) => {

    try {
        const {username, password} = req.body;
        //console.log ("in register user username: ", username, password);

        const user = await Users.create ({username: username, password: password});
        return res.status (201).json(user);
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json("Error during User Registration! Username already exists.");
        }
        return res.status (500).json (`Error during User Registration! Error: ${error}`);
    }
}