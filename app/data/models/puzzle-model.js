const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    level: {
        type:Number,
        require: true
    },
    points: Number,
    difficultness: Number,
    repeatedTimes:Number,
    size: Number,
    field: [[{row: Number, col: Number}]],
    isLocked: Boolean,
    isCurrent: Boolean,
    scores:[{username: String, score: Number}],
    rowMinesCount: [String],
    colMinesCount: [String]
});

mongoose.model('Puzzle', schema);

module.exports =  mongoose.model('Puzzle')