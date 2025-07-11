const express =  require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

const auth = require('../middleware/auth');
const Room = require('../models/Room');
const User = require('../models/User');

// @route   POST api/rooms
// @desc    Create a new room
// @access  Private
router.post('/', 
    [auth, 
        [check('name', 'Room name is required').not().isEmpty()],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:  errors.array()});
        }

        const {name} = req.body;

        try {
            const newRoom = new Room({
                name, 
                owner: req.user.id,
                users: [{user: req.user.id}],
            });

            const room = await newRoom.save();
            res.json(room);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
    }
);

// @route   GET api/rooms
// @desc    Get all rooms for the logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const rooms = await Room.find({'users.user': req.user.id});
        res.json(rooms);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;