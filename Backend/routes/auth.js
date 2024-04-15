const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');
const JWT_SECRET = "Thisismysecret";

//Route 1 : Creating a user /api/auth/createuser . No login required


router.post('/createuser', [
    body('name', 'Enter a valid Name').isLength({min:2}),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Enter a valid Password').isLength({min:8})
], async (req, res) => {
    //If there are errors return bad request message
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array()});
    }

    try {
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({success, error: "Email is been already used "})
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
    })

    const data = {user:{id:user.id}};
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success, authToken});

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");  
    }
})


//Route 2 : Authenticating a user using POST : "/api/auth/login"

router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    //If there are errors return bad request message
    const errors = validationResult(req);
    let success = false
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array()});
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({success, error: "Please try to login with correct credentials"});
        }
        
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({success, error: "Please try to login with correct credentials"});
        }

        const data = {user:{id:user.id}};
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route 3 : Get logged in user details using POST : "/api/auth/getuser"

router.post('/getuser', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router