const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userPasswordSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('userPasswordModel', userPasswordSchema);