const express = require("express");
const uploadedEntitiesModel = require("../models/uploadedEntitiesModel");
const uuid = require("uuid");
const entryModel = require("../models/entryModel");
const router = express.Router();

router.get("/api/v1/entries/:id/uploaded_entities_list", async function (req, res, next) {
    entryModel.findById(req.params.id, {uploaded_entities: 1})
        .populate("uploaded_entities_list")
        .exec((err, entity) => {
            try {
                if (err) {
                    return next(err);
                }
                return res.status(200).json(entity.uploaded_entities_list);
            }catch(err) {
                res.status(400).json({ message: err.message });
            }
        });
});

router.post("/api/v1/entries/:id/uploaded_entities_list", async function (req, res, next) {
    entryModel.findById(req.params.id, {uploaded_entities: 1})
        .populate("uploaded_entities_list")
        .exec(function (err, entry) {
            try {
                if (err) {
                    return next(err);
                }
                let id = uuid.v4();
                const entity = new uploadedEntitiesModel({
                    _id: id,
                    file: req.body.file,
                    entryID: req.params.id
                })
                entry.uploaded_entities_list.push(entity._id)
                entry.save();
                entity.save(function (err, entity) {
                    if (err) {
                        return next(err);
                    }
                    res.status(201).json(entity);
                });
            }catch(err) {
                res.status(400).json({ message: err.message });
            }
        });
});

router.delete('/api/v1/entries/:id/uploaded_entities_list/:uploaded_entity_id', async (req, res, next) => {
    let uploadedEntityId = req.params.uploaded_entity_id;
    let id = req.params.id;
    uploadedEntitiesModel.findOneAndDelete({_id: uploadedEntityId}, function (err, uploadedEntity) {
        try {
            if (uploadedEntity === null) {
                return res.status(404).json({'message': 'Entity not found'});
            }
            res.status(200).json(uploadedEntity)
        }catch(err) {
            res.status(400).json({ message: err.message });
        }
    });

    entryModel.findById(id, {entries: 1})
        .populate("uploaded_entities_list")
        .exec((err, entry) => {
            try {
                if (err) {
                    return next(err);
                }
                const index = entry.uploaded_entities_list.indexOf(uploadedEntityId)
                entry.uploaded_entities_list.splice(index, 1)
            }catch(err) {
                res.status(400).json({ message: err.message });
            }
        });

});

router.get('/api/v1/entries/:id/uploaded_entities_list/:uploaded_entity', async (req, res, next) => {
    let id = req.params.uploaded_entity;
    uploadedEntitiesModel.findById(id, function (err, entity) {
        try {
            if (err) {
                return next(err);
            }
            if (entity === null) {
                return res.status(404).json({'message': 'Entity not found!'});
            }
            res.status(200).json(entity);
        }catch(err) {
            res.status(400).json({ message: err.message });
        }
    });
});

// Creates an uploaded entity in the DB when an image is uploaded
router.post("/api/v1/uploadedEntities", function(req, res, next) {
    //const entry = new entryModel(req.body);
    let id = uuid.v4();
    const uploadedEntity = new uploadedEntitiesModel({
        _id: id,
        file:req.body.file,
        entryID: req.body.entryID
    });
    uploadedEntity.save(function (err, uploadedEntity) {
        try {
            if (err) {
                return next(err);
            }
            res.status(201).json(uploadedEntity);
        }catch(err) {
            res.status(400).json({ message: err.message });
        }
    });
});

// Gets all the uploaded entities
router.get("/api/v1/uploadedEntities", function (req, res, next) {
    uploadedEntitiesModel.find(function (err, uploadedEntity) {
        try {
            if (err) {
                return next(err);
            }
            res.status(200).json({"uploadedEntities": uploadedEntity});
        }catch(err) {
            res.status(400).json({ message: err.message });
        }
    })
});

// Gets a specific uploaded entity
router.get('/api/v1/uploadedEntities/:id', function (req, res, next) {
    let id = req.params.id;
    uploadedEntitiesModel.findById(id, function (err, uploadedEntity) {
        try {
            if (err) {
                return next(err);
            }
            if (uploadedEntity === null) {
                return res.status(404).json({'message': 'Uploaded-entity not found!'});
            }
            res.status(200).json(uploadedEntity);
        }catch(err) {
            res.status(400).json({ message: err.message });
        }
    });
});

//Do we need put/patch for uploaded entities.
router.put('/api/v1/uploadedEntities/:id', function (req, res, next) {
    let id = req.params.id;
    console.log(id);
    uploadedEntitiesModel.findById(id, function (err, uploadedEntity) {
        try {
            if (err) {
                return next(err);
            }
            if (uploadedEntity == null) {
                return res.status(404).json({"message": "Uploaded-entity not found"});
            }
            uploadedEntity.save();
            res.status(201).json(uploadedEntity);
        }catch(err) {
            res.status(400).json({ message: err.message });
        }
    });
});

//Deletes all the uploaded entities
router.delete('/api/v1/uploadedEntities', function (req, res, next) {
    uploadedEntitiesModel.deleteMany(function (err, uploadedEntity) {
        try {
            if (err) {
                return next(err);
            }
            res.status(200).json({'entries': uploadedEntity});
        }catch(err) {
            res.status(400).json({ message: err.message });
        }
    });
});

//Deletes an uploaded entity
router.delete('/api/v1/uploadedEntities/:id', function (req, res, next) {
    let id = req.params.id;
    uploadedEntitiesModel.findOneAndDelete({_id: id}, function (err, uploadedEntity) {
        try {
            if (err) {
                return next(err);
            }
            if (uploadedEntity === null) {
                return res.status(404).json({'message': 'Uploaded-entity not found'});
            }
            res.status(200).json(uploadedEntity);
        }catch(err) {
            res.status(400).json({ message: err.message });
        }
    });
});

module.exports = router;