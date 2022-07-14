const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    collection: 'Task',
    versionKey: false
});

module.exports = mongoose.model('Task', taskSchema);