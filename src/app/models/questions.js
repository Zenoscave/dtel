var mongoose = require('mongoose');

var questionSchema = mongoose.Schema({
    content: String,
    subject: String,
    answers: [{
        answer: String,
        weight: { type: Number, enum: [-1, 0, 1] }
    }],
    id: Number
});


module.exports = mongoose.model('Question', questionSchema, 'questions');
