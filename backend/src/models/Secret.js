const mongoose = require('mongoose');

const secretSchema = new mongoose.Schema({
    path: { type: String, required: true, unique: true },
    text: { type: String, required: true },
    ip: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Secret', secretSchema);