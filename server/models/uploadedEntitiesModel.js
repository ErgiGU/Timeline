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
    }]
});

module.exports = mongoose.model('uploadedEntity', uploadedEntitiesSchema);