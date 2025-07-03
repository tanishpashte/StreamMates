const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User')

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async (req, res) => {
    const {username, email, password} = req.body;

    try {
        if(!username || !email || !password){
            return res.status(400).json({msg: 'Please enter all fields'});
        }

        // Check if user already exists
        let user= await User.findOne({email});
        if(user){
            return res.status(400).json({msg:'User with this email already exists'});
        }

        user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg: 'User with this username already exists'})
        }

        // Create a new user
        user = new User({
            username, 
            email,
            password
        })

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // save the user to db
        await user.save();

        // generate a jwt
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            {expiresIn: '3h'}, 
            (err, token) =>{
                if(err) throw err;
                res.json({token})
            }
        )



    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route POST api/auth/login
// @desc Authenticate user and get token
// @access Public
router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        if(!email || !password){
            return res.status(400).json({msg:'Please enter all fields'});
        }

        // check if user exists
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg: 'Invalid Credentials'});
        }

        // check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(400).json({msg: 'Invalid Credentials'});
        }

        // generate and return JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload, 
            process.env.JWT_SECRET,
            {expiresIn: '3h'},
            (err, token) => {
                if (err) throw err;
                res.json({token});
            }
        );

    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg: 'Server error'});
    }
});

module.exports = router;