const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrySchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    text: {
        type: String
    },
    edited_date: {
        type: Date
    },
    date_date: {
        type: Date
    },
    created_date: {
        type: Date
    },
    user: {
        type: String,
        ref: "userAccount"
    },
    uploaded_entities_list: [{
        type: String,
        ref: "uploadedEntity"
    }]

});

module.exports = mongoose.model('entry', entrySchema);