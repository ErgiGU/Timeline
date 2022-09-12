const express = require("express");
const entryModel = require("../models/entryModel");
const router = express.Router();
const uuid = require('uuid');

// SEND BACK ALL ENTRIES
/*router.get("/entry", function (req, res, next){
    entryModel.find(function(err, entry){
        if(err){return next(err);}
        res.json({"entry": entry});
    })
});*/

//REGISTERS A FIXED ENTRY(TESTING PURPOSES)
router.get('/entry', function(req, res) {
    const entry = new entryModel({
        ID: "0",
        location: "Sweden",
        text : "Had a fun time in Gothenburg",
        dates: {
            edited : new Date().toISOString().slice(0,10),
            date : new Date().toISOString().slice(0,10),
            created : new Date().toISOString().slice(0,10),
        },
    });
    entry.save(function (err, entry){
        if(err){return next(err);}
        res.status(201).json(entry);
    });
    res.json({'entry': entry});
});


//CREATE AN ENTRY
router.post("/entry", function(req, res, next){
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

module.exports = router;