const express = require("express");
const userPasswordModel = require("../models/userPasswordModel");
const router = express.Router();
const uuid = require('uuid');


//CREATE AN ENTRY
router.post("/api/userPasswords", function(req, res, next) {
    //const userPassword = new userPasswordModel(req.body);
    const userPassword = new userPasswordModel({
        _id: uuid.v4(),
        salt: "apple",
        hashedPassword: "applepie224"
    })
    userPassword.save(function (err,userPassword) {
        if (err) {
            return next(err);
        }
        res.status(201).json(userPassword);
    });
});

// SEND BACK ALL ENTRIES
router.get("/api/userPasswords", function (req, res, next) {
    userPasswordModel.find(function(err, userPassword) {
        if (err) {
            return next(err);
        }
        res.json({"User Passwords": userPassword});
    })
});

router.get('/api/userPasswords/:id', function(req, res, next) {
    let id = req.params.id;
    userPasswordModel.findById(id, function(err, userPassword) {
        if (err) {
            return next(err);
        }
        if (userPassword === null) {
            return res.status(404).json({'message': 'User-password not found!'});
        }
        res.json(userPassword);
    });
});
router.put('/api/userPasswords/:id', function(req, res, next) {
    let id = req.params.id;
    console.log(id);
    userPasswordModel.findById(id, function(err, userPassword) {
        if (err) {
            return next(err);
        }
        if (userPassword == null) {
            return res.status(404).json({"message": "User-password not found"});
        }
        userPassword.hashedPassword = req.body.hashedPassword;
        userPassword.save();
        res.json(userPassword);
    });
});

router.patch('/api/userPasswords/:id', function(req, res, next) {
    let id = req.params.id;
    userPasswordModel.findById(id, function(err, userPassword) {
        if (err) {
            return next(err);
        }
        if (userPassword == null) {
            return res.status(404).json(
                {"message": "User-password not found"});
        }
        //Add the hashing and de-hashing
        userPassword.hashedPassword = req.body.hashedPassword;
        userPassword.save();
        res.json(userPassword);
    });
});

router.delete('/api/userPasswords', function(req, res, next) {
    userPasswordModel.deleteMany(function(err, userPassword) {
        if (err) { return next(err); }
        res.json({'User-password': userPassword });
    });
});

router.delete('/api/userPasswords/:id', function(req, res, next) {
    let id = req.params.id;
    userPasswordModel.findOneAndDelete({_id: id}, function(err, userPassword) {
        if (err) {
            return next(err);
        }
        if (userPassword === null) {
            return res.status(404).json({'message': 'User-password not found'});
        }
        res.json(userPassword);
    });
});

module.exports = router;