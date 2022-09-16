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
    user: {
        type: String,
        ref: "userAccount"
    },
    uploaded_entities_list:[{
        uploaded_entity : {
            type : String,
            ref : "uploadedEntity"
        }
    }],
    links:[
        {
        _id: 0,
        rel:String,
        href:String
        }
    ]

});

module.exports = mongoose.model('entry', entrySchema);