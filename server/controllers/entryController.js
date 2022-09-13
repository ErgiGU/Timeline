const express = require("express");
const entryModel = require("../models/entryModel");
const router = express.Router();
const uuid = require('uuid');


//Creates an entry
router.post("/entries", function(req, res, next){
    //const entry = new entryModel(req.body);
    const entry = new entryModel({
        _id: uuid.v4(),
        location: "Sweden",
        text : "Had a fun time in Gothenburg",
        dates: {
            edited : new Date().toISOString().slice(0,10),
            date : new Date().toISOString().slice(0,10),
            created : new Date().toISOString().slice(0,10),
        }
    })
    entry.save(function (err,entry){
        if(err){return next(err);}
        res.status(201).json(entry);
    });
});

// Gets all entries
router.get("/entries", function (req, res, next){
    entryModel.find(function(err, entry){
        if(err){return next(err);}
        res.json({"entries": entry});
    })
});

//Gets an entry
router.get('/entries/:id', function(req, res, next) {
    let id = req.params.id;
    entryModel.findById(id, function(err, entry) {
        if (err) { return next(err); }
        if (entry === null) {
            return res.status(404).json({'message': 'Entry not found!'});
        }
        res.json(entry);
    });
});

//Replaces an entry
router.put('/entries/:id', function(req, res, next) {
    let id = req.params.id;
    console.log(id);
    entryModel.findById(id, function(err, entry) {
        if (err) { return next(err); }
        if (entry == null) {
            return res.status(404).json({"message": "Entry not found"});
        }
        entry.text = req.body.text;
        entry.location = req.body.location;
        entry.dates.edited = new Date().toISOString().slice(0,10);
        entry.dates.date = new Date(req.body.dates.date).toISOString().slice(0,10);
        entry.save();
        res.json(entry);
    });
});

//Replaces specific attributes of an entry(text, date etc.)
router.patch('/entries/:id', function(req, res, next) {
    let id = req.params.id;
    entryModel.findById(id, function(err, entry) {
        if (err) { return next(err); }
        if (entry == null) {
            return res.status(404).json(
                {"message": "Entry not found"});
        }
        entry.text = (req.body.text || entry.text);
        entry.location = (req.body.location || entry.location);
        entry.dates.edited = new Date().toISOString().slice(0,10);
        entry.dates.date = (req.body.date || entry.date);
        entry.save();
        res.json(entry);
    });
});

//Deletes all entries
router.delete('/entries', function(req, res, next) {
    entryModel.deleteMany(function(err, entry) {
        if (err) { return next(err); }
        res.json({'entries': entry });
    });
});
//Deletes an entry
router.delete('/entries/:id', function(req, res, next) {
    let id = req.params.id;
    entryModel.findOneAndDelete({_id: id}, function(err, entry) {
        if (err) { return next(err); }
        if (entry === null) {
            return res.status(404).json({'message': 'Entry not found'});
        }
        res.json(entry);
    });
});

module.exports = router;