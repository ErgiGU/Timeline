const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSaltSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('userSaltModel', userSaltSchema);