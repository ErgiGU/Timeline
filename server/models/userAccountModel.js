const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const userAccountSchema = new Schema({
    _id: {
        type: String,
        required: true
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
    date_of_birth: {
        type: String,
        required: false
    },
    profile_picture: {
        type: String,
        required: false
    },
    entry_list: [{
        type: String,
        ref: "entry",
        required: true
    }],
    links: [
        {
            _id: 0,
            rel: String,
            href: String
        }
    ]
});

userAccountSchema.methods.generateToken = function () {
    const token = jwt.sign(this.toJSON(), 'secret_key');
    return token;
}

module.exports = mongoose.model('userAccount', userAccountSchema);
