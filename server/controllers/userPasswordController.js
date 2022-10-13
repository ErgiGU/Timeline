const express = require("express");
const userPasswordModel = require("../models/userPasswordModel");
const router = express.Router();
const bcrypt = require("bcrypt");

//CREATE AN ENTRY
router.post("/api/userPasswords", async function (req, res, next) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userPassword = new userPasswordModel({
        _id: req.body._id,
        hashedPassword: hashedPassword
    });
    userPassword.save(function (err, userPassword) {
        if (err) {
            return next(err);
        }
        res.status(201).json(userPassword);
    });
});

// SEND BACK ALL ENTRIES
router.get("/api/userPasswords", function (req, res, next) {
    userPasswordModel.find(function (err, userPassword) {
        if (err) {
            return next(err);
        }
        res.json({"User Passwords": userPassword});
    })
});

router.get('/api/userPasswords/:id', function (req, res, next) {
    let id = req.params.id;
    userPasswordModel.findById(id, function (err, userPassword) {
        if (err) {
            return next(err);
        }
        if (userPassword === null) {
            return res.status(404).json({'message': 'User-password not found!'});
        }
        res.json(userPassword);
    });
});

router.put('/api/userPasswords/:id', function (req, res, next) {
    let id = req.params.id;
    console.log(id);
    userPasswordModel.findById(id, async function (err, userPassword) {
        if (err) {
            return next(err);
        }
        if (userPassword == null) {
            return res.status(404).json({"message": "User-password not found"});
        }
        userPassword.hashedPassword = await bcrypt.hash(req.body.password, 10);
        userPassword.save();
        res.status(201).json("User password updated.");
    });
});

router.patch('/api/userPasswords/:id', function (req, res, next) {
    let id = req.params.id;
    userPasswordModel.findById(id, async function (err, userPassword) {
        if (err) {
            return next(err);
        }
        if (userPassword == null) {
            return res.status(404).json({"message": "User-password not found"});
        }

        userPassword.hashedPassword = await bcrypt.hash(req.body.password, 10);
        userPassword.save();
        res.json("password updated.");
    });
});

router.delete('/api/userPasswords', function (req, res, next) {
    userPasswordModel.deleteMany(function (err, userPassword) {
        if (err) {
            return next(err);
        }
        res.json({'User-password': userPassword});
    });
});

router.delete('/api/userPasswords/:id', function (req, res, next) {
    let id = req.params.id;
    userPasswordModel.findOneAndDelete({_id: id}, function (err, userPassword) {
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