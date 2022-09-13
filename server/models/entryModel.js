const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrySchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        ref: 'userAccount',
        required: true
    },
    location: {
        type: String
    },
    text : {
        type : String
    },
    dates: {
        edited : {type : Date},
        date : {type : Date},
        created : {type : Date},
    },
});

module.exports = mongoose.model('entry', entrySchema);