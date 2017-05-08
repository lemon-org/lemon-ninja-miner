const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    eMail: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    reachedLevel: {
        type: Number,
        required: true
    }
});

mongoose.model('User', schema);

let userModel = mongoose.model('User');

module.exports = userModel;