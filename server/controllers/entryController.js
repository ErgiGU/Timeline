const express = require("express");
const userAccountModel = require("../models/userAccountModel");
const entryModel = require("../models/entryModel");
const router = express.Router();
const uuid = require('uuid');


router.get("/api/userAccounts/:id/entry_list", async function (req, res) {
    userAccountModel.findById(req.params.id, {entries: 1})
        .populate("entry_list")
        .exec((err, userAccounts) => {
            if (err) {
                return res.status(400).send(err);
            }
            return res.status(200).json(userAccounts.entry_list);
        });
});

router.post("/api/userAccounts/:id/entry_list", async function (req, res, next) {
    userAccountModel.findById(req.params.id, {entries: 1})
        .populate("entry_list")
        .exec(function (err, userAccount) {
            if (err) {
                return res.status(400).send(err);
            }
            let id = uuid.v4();
            const entry = new entryModel({
                _id: id,
                location: req.body.location,
                text: req.body.text,
                user: req.params.id,
                uploaded_entities_list: [],
                dates: {
                    edited: new Date().toISOString(),
                    date: new Date().toISOString(),
                    created: new Date().toISOString(),
                },
                links: [
                    {
                        rel: "users",
                        href: "http://localhost:3000/api/entries/" + id
                    }
                ]
            })
            userAccount.entry_list.push(id);

            userAccount.save();
            entry.save(function (err, entry) {
                if (err) {
                    return next(err);
                }
                res.status(201).json(entry);
            });
        });
});

router.delete('/api/userAccounts/:id/entry_list/:entry_id', async (req, res) => {
    let entry_id = req.params.entry_id;
    let id = req.params.id;
    entryModel.findOneAndDelete({_id: entry_id}, function (err, entry) {
        if (entry === null) {
            return res.status(404).json({'message': 'Entry not found'});
        }
        res.status(200).json(entry)
    });

    userAccountModel.findById(id, {entries: 1})
        .populate("entry_list")
        .exec((err, userAccounts) => {
            if (err) {
                return res.status(400).send(err);
            }
            const index = userAccounts.entry_list.indexOf(entry_id)
            userAccounts.entry_list.splice(index, 1)
        });

});

router.get('/api/userAccounts/:id/entry_list/:entry_id', async (req, res, next) => {
    let id = req.params.entry_id;
    entryModel.findById(id, function (err, entry) {
        if (err) {
            return next(err);
        }
        if (entry === null) {
            return res.status(404).json({'message': 'Entry not found!'});
        }
        res.json(entry);
    });
});

//Creates an entry
router.post("/api/entries", function (req, res, next) {
    let id = uuid.v4();
    const entry = new entryModel({
        _id: id,
        location: req.body.location,
        text: req.body.text,
        user: req.body.user,
        dates: {
            edited: new Date().toISOString(),
            date: new Date().toISOString(),
            created: new Date().toISOString(),
        },
        links: [
            {
                rel: "users",
                href: "http://localhost:3000/api/entries/" + id
            }
        ]
    })
    entry.save(function (err, entry) {
        if (err) {
            return next(err);
        }
        res.status(201).json(entry);
    });
});

//Get all entry or get all by filter if query
router.get('/api/entries', function (req, res, next) {
    let filter = req.query.text;
    entryModel.find(function (err, entry) {
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
router.get('/api/entries/:id', function (req, res, next) {
    let id = req.params.id;
    entryModel.findById(id, function (err, entry) {
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
router.put('/api/entries/:id', function (req, res, next) {
    let id = req.params.id;
    console.log(id);
    entryModel.findById(id, function (err, entry) {
        if (err) {
            return next(err);
        }
        if (entry == null) {
            return res.status(404).json({"message": "Entry not found"});
        }
        entry.text = req.body.text;
        entry.location = req.body.location;
        entry.dates.edited = new Date().toISOString().slice(0, 10);
        entry.dates.date = new Date().toISOString().slice(0, 10);
        entry.save();
        return res.status(201).json(entry);
    });
});

//Replaces specific attributes of an entry(text, date etc.)
router.patch('/api/entries/:id', function (req, res, next) {
    let id = req.params.id;
    entryModel.findById(id, function (err, entry) {
        if (err) {
            return next(err);
        }
        if (entry == null) {
            return res.status(404).json(
                {"message": "Entry not found"});
        }
        entry.text = (req.body.text || entry.text);
        entry.location = (req.body.location || entry.location);
        entry.edited = new Date().toISOString().slice(0, 10);
        entry.date = (req.body.date || entry.date);
        entry.created = (req.body.created || entry.created);
        if (req.body.uploaded_entity) {
            entry.uploaded_entities_list.push(req.body.uploaded_entity);
        }

        entry.save();
        res.json(entry);
    });
});

//Deletes all entries
router.delete('/api/entries', function (req, res, next) {
    entryModel.deleteMany(function (err, entry) {
        if (err) {
            return next(err);
        }
        res.json({'entries': entry});
    });
});

//Deletes an entry
router.delete('/api/entries/:id', function (req, res, next) {
    let id = req.params.id;
    entryModel.findOneAndDelete({_id: id}, function (err, entry) {
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