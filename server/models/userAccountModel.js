const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userAccountSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    first_name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: false
    }
});

module.exports = mongoose.model('userAccountModel', userAccountSchema);