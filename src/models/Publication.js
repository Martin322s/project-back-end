const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    category: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    donations: {
        type: Number,
        required: true,
        default: 0
    },
    donators: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    _ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Publication = mongoose.model('Publication', publicationSchema);

module.exports = Publication;