const express = require("express");
const uploadedEntitiesModel = require("../models/uploadedEntitiesModel");
const uuid = require("uuid");
const entryModel = require("../models/entryModel");
const router = express.Router();

router.get("/api/v1/entries/:id/uploaded_entities_list", async function (req, res) {
    entryModel.findById(req.params.id, {uploaded_entities: 1})
        .populate("uploaded_entities_list")
        .exec((err, entity) => {
            if (err) {
                return res.status(400).send(err);
            }
            return res.status(200).json(entity.uploaded_entities_list);
        });
});

router.post("/api/v1/entries/:id/uploaded_entities_list", async function (req, res, next) {
    entryModel.findById(req.params.id, {uploaded_entities: 1})
        .populate("uploaded_entities_list")
        .exec(function (err, entry) {
            if (err) {
                return res.status(400).send(err);
            }
            let id = uuid.v4();
            const entity = new uploadedEntitiesModel({
                _id: id,
                file: req.body.file,
                entryID: req.params.id,
                metadata: [{
                    filename: "Discord",
                    location: "Africa"
                }],
                links: [
                    {
                        rel: "entries",
                        href: "http://localhost:3000/api/uploadedEntities/"
                    }
                ]
            })
            entry.uploaded_entities_list.push(entity._id)
            entry.save();
            entity.save(function (err, entity) {
                if (err) {
                    return next(err);
                }
                res.status(201).json(entity);
            });
        });
});

router.delete('/api/v1/entries/:id/uploaded_entities_list/:uploaded_entity_id', async (req, res) => {
    let uploadedEntityId = req.params.uploaded_entity_id;
    let id = req.params.id;
    uploadedEntitiesModel.findOneAndDelete({_id: uploadedEntityId}, function (err, uploadedEntity) {
        if (uploadedEntity === null) {
            return res.status(404).json({'message': 'Entity not found'});
        }
        res.status(200).json(uploadedEntity)
    });

    entryModel.findById(id, {entries: 1})
        .populate("uploaded_entities_list")
        .exec((err, entry) => {
            if (err) {
                return res.status(400).send(err);
            }
            const index = entry.uploaded_entities_list.indexOf(uploadedEntityId)
            entry.uploaded_entities_list.splice(index, 1)
        });

});

router.get('/api/v1/entries/:id/uploaded_entities_list/:uploaded_entity', async (req, res, next) => {
    let id = req.params.uploaded_entity;
    uploadedEntitiesModel.findById(id, function (err, entity) {
        if (err) {
            return next(err);
        }
        if (entity === null) {
            return res.status(404).json({'message': 'Entity not found!'});
        }
        res.json(entity);
    });
});

// Creates an uploaded entity in the DB when an image is uploaded
router.post("/api/v1/uploadedEntities", function(req, res, next) {
    //const entry = new entryModel(req.body);
    let id = uuid.v4();
    const uploadedEntity = new uploadedEntitiesModel({
        _id: id,
        file:req.body.file,
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
    uploadedEntity.save(function (err, uploadedEntity) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(201).json(uploadedEntity);
    });
});

// Gets all the uploaded entities
router.get("/api/v1/uploadedEntities", function (req, res, next) {
    uploadedEntitiesModel.find(function (err, uploadedEntity) {
        if (err) {
            return next(err);
        }
        res.json({"uploadedEntities": uploadedEntity});
    })
});

// Gets a specific uploaded entity
router.get('/api/v1/uploadedEntities/:id', function (req, res, next) {
    let id = req.params.id;
    uploadedEntitiesModel.findById(id, function (err, uploadedEntity) {
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
router.put('/api/v1/uploadedEntities/:id', function (req, res, next) {
    let id = req.params.id;
    console.log(id);
    uploadedEntitiesModel.findById(id, function (err, uploadedEntity) {
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
router.patch('/api/v1/uploadedEntities/:id', function (req, res, next) {
    let id = req.params.id;
    uploadedEntitiesModel.findById(id, function (err, uploadedEntity) {
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
router.delete('/api/v1/uploadedEntities', function (req, res, next) {
    uploadedEntitiesModel.deleteMany(function (err, uploadedEntity) {
        if (err) {
            return next(err);
        }
        res.json({'entries': uploadedEntity});
    });
});

//Deletes an uploaded entity
router.delete('/api/v1/uploadedEntities/:id', function (req, res, next) {
    let id = req.params.id;
    uploadedEntitiesModel.findOneAndDelete({_id: id}, function (err, uploadedEntity) {
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