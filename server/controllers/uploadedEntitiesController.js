const express = require("express");
const uploadedEntitiesModel = require("../models/uploadedEntitiesModel");
const router = express.Router();


// Creates an uploaded entity in the DB when an image is uploaded
router.post("/api/uploadedEntities", function(req, res, next) {
    //const entry = new entryModel(req.body);
    const uploadedEntity = new uploadedEntitiesModel({
        file:"C://Users//Naruto//AppData//Roaming//Microsoft//Windows//Start Menu//Programs//Discord Inc",
        entryID: "empty_for_now",
        metadata:[{
            filename:"Discord",
            location:"Africa"
        }],
        links:[
            {
                rel: "entries",
                href: "http://localhost:3000/api/uploadedEntities/"
            }
        ]
    });
    uploadedEntity.save(function (err,uploadedEntity){
        if (err) {
            return next(err);
        }
        res.status(201).json(uploadedEntity);
    });
});

// Gets all the uploaded entities
router.get("/api/uploadedEntities", function (req, res, next) {
    uploadedEntitiesModel.find(function(err, uploadedEntity) {
        if (err) {
            return next(err);
        }
        res.json({"uploadedEntities": uploadedEntity});
    })
});

// Gets a specific uploaded entity
router.get('/api/uploadedEntities/:id', function(req, res, next) {
    let id = req.params.id;
    uploadedEntitiesModel.findById(id, function(err, uploadedEntity) {
        if (err) {
            return next(err);
        }
        if (uploadedEntity === null) {
            return res.status(404).json({'message': 'Uploaded-entity not found!'});
        }
        res.json(uploadedEntity);
    });
});

//Do we need put/patch for uploaded entities.
router.put('/api/uploadedEntities/:id', function(req, res, next) {
    let id = req.params.id;
    console.log(id);
    uploadedEntitiesModel.findById(id, function(err, uploadedEntity) {
        if (err) {
            return next(err);
        }
        if (uploadedEntity == null) {
            return res.status(404).json({"message": "Uploaded-entity not found"});
        }
        uploadedEntity.save();
        res.json(uploadedEntity);
    });
});

//Do we need put/patch for uploaded entities
router.patch('/api/uploadedEntities/:id', function(req, res, next) {
    let id = req.params.id;
    uploadedEntitiesModel.findById(id, function(err, uploadedEntity) {
        if (err) {
            return next(err);
        }
        if (uploadedEntity == null) {
            return res.status(404).json(
                {"message": "uploaded-entity not found"});
        }
        uploadedEntity.save();
        res.json(uploadedEntity);
    });
});

//Deletes all the uploaded entities
router.delete('/api/uploadedEntities', function(req, res, next) {
    uploadedEntitiesModel.deleteMany(function(err, uploadedEntity) {
        if (err) {
            return next(err);
        }
        res.json({'entries': uploadedEntity });
    });
});

//Deletes an uploaded entity
router.delete('/api/uploadedEntities/:id', function(req, res, next) {
    let id = req.params.id;
    uploadedEntitiesModel.findOneAndDelete({_id: id}, function(err, uploadedEntity) {
        if (err) {
            return next(err);
        }
        if (uploadedEntity === null) {
            return res.status(404).json({'message': 'Uploaded-entity not found'});
        }
        res.json(uploadedEntity);
    });
});

module.exports = router;