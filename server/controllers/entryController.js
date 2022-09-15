const express = require("express");
const entryModel = require("../models/entryModel");
const router = express.Router();
const uuid = require('uuid');


//Creates an entry
router.post("/api/entries", function(req, res, next) {
    let id = uuid.v4();
    const entry = new entryModel({
        _id: id,
        location: req.body.location,
        text : req.body.text,
        dates: {
            edited : new Date().toISOString().slice(0,10),
            date : new Date().toISOString().slice(0,10),
            created : new Date().toISOString().slice(0,10),
        },
        links:[
            {
               rel: "users",
               href: "http://localhost:3000/api/entries/" + id
            }
        ]
    })
    entry.save(function (err,entry) {
        if (err) {
            return next(err);
        }
        res.status(201).json(entry);
    });
});

//Get all entry or get all by filter if query
router.get('/api/entries', function(req, res) {
    let filter = req.query.text;
    entryModel.find(function(err, entry) {
        if (filter) {
            res.json(entry.filter(function (e) {
                return filter === e.text;
            }));
        } else {
            if (err) {
                return next(err);
            }
            res.json({"entries": entry});
        }
    })
});

//Gets an entry
router.get('/api/entries/:id', function(req, res, next) {
    let id = req.params.id;
    entryModel.findById(id, function(err, entry) {
        if (err) {
            return next(err);
        }
        if (entry === null) {
            return res.status(404).json({'message': 'Entry not found!'});
        }
        res.json(entry);
    });
});

//Replaces an entry
router.put('/api/entries/:id', function(req, res, next) {
    let id = req.params.id;
    console.log(id);
    entryModel.findById(id, function(err, entry) {
        if (err) {
            return next(err);
        }
        console.log("got here");
        if (entry == null) {
            return res.status(404).json({"message": "Entry not found"});
        }
        console.log("got here");
        entry.text = req.body.text;
        entry.location = req.body.location;
        entry.dates.edited = new Date().toISOString().slice(0,10);
        entry.dates.date = new Date().toISOString().slice(0,10);
        entry.save();
        return res.status(201).json(entry);
    });
});

//Replaces specific attributes of an entry(text, date etc.)
router.patch('/api/entries/:id', function(req, res, next) {
    let id = req.params.id;
    entryModel.findById(id, function(err, entry) {
        if (err) {
            return next(err);
        }
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
router.delete('/api/entries', function(req, res, next) {
    entryModel.deleteMany(function(err, entry) {
        if (err) {
            return next(err);
        }
        res.json({'entries': entry });
    });
});
//Deletes an entry
router.delete('/api/entries/:id', function(req, res, next) {
    let id = req.params.id;
    entryModel.findOneAndDelete({_id: id}, function(err, entry) {
        if (err) {
            return next(err);
        }
        if (entry === null) {
            return res.status(404).json({'message': 'Entry not found'});
        }
        res.json(entry);
    });
});

module.exports = router;