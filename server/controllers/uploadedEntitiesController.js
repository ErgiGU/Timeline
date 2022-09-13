const express = require("express");
const uploadedEntitiesModel = require("../models/uploadedEntitiesModel");
const router = express.Router();
const uuid = require('uuid');


// Creates an uploaded entity in the DB when an image is uploaded
router.post("/uploadedEntities", function(req, res, next){
    //const entry = new entryModel(req.body);
    const uploadedEntity = new uploadedEntitiesModel({

    })
    uploadedEntity.save(function (err,uploadedEntity){
        if(err){return next(err);}
        res.status(201).json(uploadedEntity);
    });
});

// Gets all the uploaded entities
router.get("/uploadedEntities", function (req, res, next){
    uploadedEntitiesModel.find(function(err, uploadedEntity){
        if(err){return next(err);}
        res.json({"entries": uploadedEntity});
    })
});

// Gets a specific uploaded entity
router.get('/uploadedEntities/:id', function(req, res, next) {
    let id = req.params.id;
    uploadedEntitiesModel.findById(id, function(err, uploadedEntity) {
        if (err) { return next(err); }
        if (uploadedEntity === null) {
            return res.status(404).json({'message': 'Uploaded-entity not found!'});
        }
        res.json(uploadedEntity);
    });
});

//Replaces an entire uploaded entity
router.put('/uploadedEntities/:id', function(req, res, next) {
    let id = req.params.id;
    console.log(id);
    uploadedEntitiesModel.findById(id, function(err, uploadedEntity) {
        if (err) { return next(err); }
        if (uploadedEntity == null) {
            return res.status(404).json({"message": "Uploaded-entity not found"});
        }
        uploadedEntity.save();
        res.json(uploadedEntity);
    });
});

//Replaces specific attributes of an uploaded entity
router.patch('/uploadedEntities/:id', function(req, res, next) {
    let id = req.params.id;
    uploadedEntitiesModel.findById(id, function(err, uploadedEntity) {
        if (err) { return next(err); }
        if (uploadedEntity == null) {
            return res.status(404).json(
                {"message": "uploaded-entity not found"});
        }
        uploadedEntity.save();
        res.json(uploadedEntity);
    });
});

//Deletes all the uploaded entities
router.delete('/uploadedEntities', function(req, res, next) {
    uploadedEntitiesModel.deleteMany(function(err, uploadedEntity) {
        if (err) { return next(err); }
        res.json({'entries': uploadedEntity });
    });
});

//Deletes an uploaded entity
router.delete('/uploadedEntities/:id', function(req, res, next) {
    let id = req.params.id;
    uploadedEntitiesModel.findOneAndDelete({_id: id}, function(err, uploadedEntity) {
        if (err) { return next(err); }
        if (uploadedEntity === null) {
            return res.status(404).json({'message': 'Uploaded-entity not found'});
        }
        res.json(uploadedEntity);
    });
});




module.exports = router;