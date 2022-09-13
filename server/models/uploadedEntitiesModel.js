const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uploadedEntitiesSchema = new Schema({
    file:{
        path: String,
        required: true
    },
    entryID: {
        type: String,
        ref: 'entry',
        required: true
    },
    metadata:[{
        filename:{
            type: String,
            required: true
        },
        location:{
            type:String,
            required: false
        }
    }]
});

module.exports = mongoose.model('uploadedEntities', uploadedEntitiesSchema);