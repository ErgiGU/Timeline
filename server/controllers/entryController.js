const express = require("express");
const userAccountModel = require("../models/userAccountModel");
const entryModel = require("../models/entryModel");
const router = express.Router();
const uuid = require('uuid');

// Get user entries
router.get("/api/v1/userAccounts/:id/entry_list", async function (req, res, next) {
    userAccountModel.findById(req.params.id, {entries: 1})
        .populate("entry_list")
        .exec((err, userAccount) => {
            try {
                if (err) {
                    return next(err);
                }
                return res.status(200).json({"entries": userAccount.entry_list})

            }catch(err) {
                res.status(400).json({ message: err.message });
            }
        });
});

// Post new user entry list
router.post("/api/v1/userAccounts/:id/entry_list", async function (req, res, next) {
    userAccountModel.findById(req.params.id, {entries: 1})
        .populate("entry_list")
        .exec(function (err, userAccount) {
            if (err) {
                return next(err);
            }
            let id = uuid.v4();
            const entry = new entryModel({
                _id: id,
                location: req.body.location,
                text: req.body.text,
                user: req.params.id,
                uploaded_entities_list: [],
                edited_date: new Date().toISOString(),
                date_date: new Date().toISOString(),
                created_date: new Date().toISOString(),
                links: [
                    {
                        rel: "users",
                        href: "http://localhost:3000/api/v1/entries/" + id
                    }
                ]
            })
            userAccount.entry_list.push(id);

            userAccount.save();
            entry.save(function (err, entry) {
                try {
                    if (err) {
                        return next(err);
                    }
                    res.status(201).json(entry);
                }catch(err) {
                    res.status(400).json({ message: err.message });
                }
            });
        });
});

// Delete specific entry from user list
router.delete('/api/v1/userAccounts/:id/entry_list/:entry_id', async (req, res, next) => {
    let entry_id = req.params.entry_id;
    let id = req.params.id;
    entryModel.findOneAndDelete({_id: entry_id}, function (err, entry) {
        try {
            if(err) {
                return next(err)
            }
            if (entry === null) {
                return res.status(404).json({'message': 'Entry not found'});
            }
            res.status(200).json(entry)
        }catch(err) {
            res.status(400).json({ message: err.message });
        }
    });

    userAccountModel.findById(id, {entries: 1})
        .populate("entry_list")
        .exec((err, userAccounts) => {
            try {
                if (err) {
                    return res.status(400).send(err);
                }
                const index = userAccounts.entry_list.indexOf(entry_id)
                userAccounts.entry_list.splice(index, 1)
            }catch(err) {
                res.status(400).json({ message: err.message });
            }
        });

});

// Get specific entry from user list
router.get('/api/v1/userAccounts/:id/entry_list/:entry_id', async (req, res, next) => {
    let id = req.params.entry_id;
    entryModel.findById(id, function (err, entry) {
        try {
            if (err) {
                return next(err);
            }
            if (entry === null) {
                return res.status(404).json({'message': 'Entry not found!'});
            }
            res.status(200).json(entry);
        }catch(err) {
            res.status(400).json({ message: err.message });
        }

    });
});

//Creates an entry
router.post("/api/v1/entries", function (req, res, next) {
    let id = uuid.v4();
    const entry = new entryModel({
        _id: id,
        location: req.body.location,
        text: req.body.text,
        user: req.body.user,
        edited_date: new Date().toISOString(),
        date_date: req.body.date_date,
        created_date: new Date().toISOString(),
        links: [
            {
                rel: "users",
                href: "http://localhost:3000/api/v1/entries/" + id
            }
        ]
    })
    entry.save(function (err, entry) {
        try {
            if (err) {
                return next(err);
            }
            res.status(201).json(entry);
        }catch(err) {
            res.status(400).json({ message: err.message });
        }
    });
});

//Get all entry or get all by filter if query
router.get('/api/v1/entries', function (req, res, next) {
    let filter = req.query.text;
    entryModel.find(function (err, entry) {
        try {
            if (filter) {
                res.json(entry.filter(function (e) {
                    return filter === e.text;
                }));
            } else {
                if (err) {
                    return next(err);
                }
                res.status(200).json({"entries": entry});
            }
        }catch(err) {
            res.status(400).json({ message: err.message });
        }
    })
});

//Gets an entry
router.get('/api/v1/entries/:id', function (req, res, next) {
    let id = req.params.id;
    entryModel.findById(id, function (err, entry) {
        try {
            if (err) {
                return next(err);
            }
            if (entry === null) {
                return res.status(404).json({'message': 'Entry not found!'});
            }
            res.status(200).json(entry);
        }catch(err) {
            res.status(400).json({ message: err.message });
        }
    });
});

//Replaces an entry
router.put('/api/v1/entries/:id', function (req, res, next) {
    let id = req.params.id;
    console.log(id);
    entryModel.findById(id, function (err, entry) {
        try {
            if (err) {
                return next(err);
            }
            if (entry == null) {
                return res.status(404).json({"message": "Entry not found"});
            }
            entry.text = req.body.text;
            entry.location = req.body.location;
            entry.edited_date = new Date().toISOString().slice(0, 10);
            entry.date_date = new Date().toISOString().slice(0, 10);
            entry.save();
            return res.status(201).json(entry);
        }catch(err) {
            res.status(400).json({ message: err.message });
        }
    });
});

//Replaces specific attributes of an entry(text, date etc.)
router.patch('/api/v1/entries/:id', function (req, res, next) {
    let id = req.params.id;
    entryModel.findById(id, function (err, entry) {
        try {
            if (err) {
                return next(err);
            }
            if (entry == null) {
                return res.status(404).json(
                    {"message": "Entry not found"});
            }
            entry.text = (req.body.text || entry.text);
            entry.location = (req.body.location || entry.location);
            entry.edited_date = new Date().toISOString().slice(0, 10);
            entry.date_date = (req.body.date || entry.date_date);
            entry.created_date = (req.body.created || entry.created_date);
            if (req.body.uploaded_entity) {
                entry.uploaded_entities_list.push(req.body.uploaded_entity);
            }
            entry.save();
            res.status(200).json(entry);
        }catch(err) {
            res.status(400).json({ message: err.message });
        }
    });
});

//Deletes all entries
router.delete('/api/v1/entries', function (req, res, next) {
    entryModel.deleteMany(function (err, entry) {
        try {
            if (err) {
                return next(err);
            }
            res.status(200).json({'entries': entry});
        }catch(err) {
            res.status(400).json({ message: err.message });
        }
    });
});

//Deletes an entry
router.delete('/api/v1/entries/:id', function (req, res, next) {
    let id = req.params.id;
    entryModel.findOneAndDelete({_id: id}, function (err, entry) {
        try {
            if (err) {
                return next(err);
            }
            if (entry === null) {
                return res.status(404).json({'message': 'Entry not found'});
            }
            res.status(200).json(entry);
        }catch(err) {
            res.status(400).json({ message: err.message });
        }
    });
});

module.exports = router;