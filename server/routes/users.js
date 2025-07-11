const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); 
const User = require('../models/User');

router.get('/me', auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if(!user){
            return res.status(404).json({msg: 'User not found'});
        }
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;