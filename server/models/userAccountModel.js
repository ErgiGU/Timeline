const mongoose = require('mongoose');
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
        type: Date,
        required: false
    },
    profile_picture: {
        type: String,
        required: false
    },
    entry_list:[{
        type : String,
        ref : "entry"
    }],
    links:[
        {
            _id: 0,
            rel:String,
            href:String
        }
    ]
});

module.exports = mongoose.model('userAccount', userAccountSchema);