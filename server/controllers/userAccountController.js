const express = require("express");
const userAccountModel = require("../models/userAccountModel");
//const userPassword = require("../models/userPasswordModel");
const router = express.Router();
const uuid = require('uuid');
const entryModel = require("../models/entryModel");
const uploadedEntitiesModel = require("../models/uploadedEntitiesModel");
//const bcrypt = require("bcrypt");

// Gets all the user accounts
router.get("/api/v1/userAccounts", function (req, res, next) {
    userAccountModel.find(function (err, userAccount) {
        try {
            if (err) {
                return next(err);
            }
            res.status(200).json({"users": userAccount});
        }catch(err) {
            res.status(400).json({ message: err.message });
        }
    })
});

//Creates the user account in the DB
router.post("/api/v1/userAccounts", function (req, res, next) {
    let id = uuid.v4();
    const userAccount = new userAccountModel({
        _id: id,
        first_name: req.body.first_name,
        surname: req.body.surname,
        email: req.body.email,
        profile_picture: "empty",
        entry_list: []
    })

    userAccount.save(function (err, userAccount) {
        try {
            if (err) {
                return next(err);
            }

            res.status(201).json(userAccount);
        }catch(err) {
            res.status(400).json({ message: err.message });
        }
    });
});

//Deletes all user accounts
router.delete("/api/v1/userAccounts", function (req, res, next) {
    userAccountModel.deleteMany(function (err, userAccount) {
        try {
            if (err) {
                return next(err);
            }
            res.status(200).json({'userAccounts': userAccount});
        }catch(err) {
            res.status(400).json({ message: err.message });
        }
    });
});

// Gets a user account
router.get("/api/v1/userAccounts/:id", function (req, res, next) {
    let id = req.params.id;
    userAccountModel.findById(id, function (err, userAccount) {
        try {
            if (err) {
                return next(err);
            }
            if (userAccount === null) {
                return res.status(404).json({'message': 'User not found!'});
            }
            res.status(200).json(userAccount);
        }catch(err) {
            res.status(400).json({ message: err.message });
        }

    });
});

//I don't think we should have this for the user account
router.put("/api/v1/userAccounts/:id", function (req, res, next) {
    let id = req.params.id;
    userAccountModel.findById(id, function (err, userAccount) {
        try {
            if (err) {
                return next(err);
            }
            if (userAccount == null) {
                return res.status(404).json({"message": "User not found"});
            }
            userAccount.first_name = req.body.first_name;
            userAccount.surname = req.body.surname;
            userAccount.email = req.body.email;
            userAccount.date_of_birth = req.body.date_of_birth;
            userAccount.save();
            res.status(201).json(userAccount);
        }catch(err) {
            res.status(400).json({ message: err.message });
        }
    });
});

//Replaces specific attributes of the user account
router.patch("/api/v1/userAccounts/:id", function (req, res, next) {
    let id = req.params.id;
    userAccountModel.findById(id, function (err, userAccount) {
        try {
            if (err) {
                return next(err);
            }
            if (userAccount == null) {
                return res.status(404).json(
                    {"message": "User not found"});
            }
            userAccount.first_name = (req.body.first_name || userAccount.first_name);
            userAccount.surname = (req.body.surname || userAccount.surname);
            userAccount.email = (req.body.email || userAccount.email);
            userAccount.date_of_birth = (req.body.date_of_birth || userAccount.date_of_birth);
            userAccount.profile_picture = (req.body.profile_picture || userAccount.profile_picture);
            if (req.body.entry_list) {
                userAccount.entry_list = req.body.entry_list
                userAccount.populate("entry_list")
            }
            userAccount.find
            userAccount.save();
            res.status(200).json(userAccount);
        }catch(err) {
            res.status(400).json({ message: err.message });
        }
    });
});

//Deletes a user account
router.delete("/api/v1/userAccounts/:id", function (req, res, next) {
    let id = req.params.id;
    try {
        userAccountModel.findById(id, function (err, userAccount) {
            if (err) {
                return next(err);
            }
            userAccount.entry_list.forEach(element => {
                entryModel.findById(element, function (err, entry) {
                    try {
                        if (err) {
                            return next(err);
                        }
                        entry.uploaded_entities_list.forEach(uploadedElement =>
                            uploadedEntitiesModel.findOneAndDelete({_id: uploadedElement})
                        )
                    }catch(err) {
                        res.status(400).json({ message: err.message });
                    }
                })
                entryModel.findOneAndDelete({_id: element});
            });
        });
        userAccountModel.findOneAndDelete({_id: id}, function (err, userAccount) {
            if (err) {
                return next(err);
            }
            if (userAccount === null) {
                return res.status(404).json({'message': 'user not found'});
            }
            res.status(200).json(userAccount);
        });
    }catch(err) {
        res.status(400).json({ message: err.message });
    }
});

//Gets statistics for an account
router.get("/api/v1/statistics/:id", function (req, res, next) {
    userAccountModel.findById(req.params.id, {entries: 1})
        .populate("entry_list")
        .exec((err, userAccounts) => {
            if (userAccounts === null) {
                return res.status(404).json({'message': 'user not found'});
            }
            let totalEntry
            let totalImages = 0;
            let words = [];
            let averageWords = 0;
            try {
                if (err) {
                    return next(err);
                }
                userAccounts.entry_list.forEach(entry => {
                    if (entry.uploaded_entities_list) {
                        totalImages = totalImages + entry.uploaded_entities_list.length
                    }
                    let newWordsList = entry.text.split(" ")
                    words = words.concat(newWordsList)
                })
                totalEntry = userAccounts.entry_list.length

                if (totalEntry) {
                    averageWords = (words.length / totalEntry)
                }
                averageWords = Math.round(averageWords * 100) / 100
                res.status(200).json({
                    'totalEntries': totalEntry,
                    'totalImages': totalImages,
                    'totalSize': words.length,
                    'averageWord': averageWords
                });
            }catch(err) {
                res.status(400).json({ message: err.message });
            }
        })
});

module.exports = router;