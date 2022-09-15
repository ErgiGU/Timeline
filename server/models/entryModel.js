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
    text : {
        type : String
    },
    dates: {
        edited : {type : Date},
        date : {type : Date},
        created : {type : Date},
    },
    uploaded_entities_list:[{
        uploaded_entities : {
            type : String,
            ref : "uploadedEntity"
        }
    }]
});

module.exports = mongoose.model('entry', entrySchema);