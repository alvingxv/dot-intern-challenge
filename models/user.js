const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    collection: 'User',
    versionKey: false //here
});

module.exports = mongoose.model('User', userSchema);