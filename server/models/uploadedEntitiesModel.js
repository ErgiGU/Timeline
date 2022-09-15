const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uploadedEntitiesSchema = new Schema({
    file: {
        path: String,
    },
    metadata:[{
        filename:{
            type: String,
        },
        location:{
            type:String,
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

module.exports = mongoose.model('uploadedEntity', uploadedEntitiesSchema);