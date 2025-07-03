const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        name: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    createdAt: {
        type:Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);
model.exports = User;