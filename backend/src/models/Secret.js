const mongoose = require('mongoose');

const secretSchema = new mongoose.Schema({
    path: { type: String, required: true, unique: true },
    text: { type: String, required: true },
    lastUpdatedByIp: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Secret', secretSchema);