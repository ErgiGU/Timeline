const express = require("express");
const userPasswordModel = require("../models/userPasswordModel");
const router = express.Router();
const uuid = require('uuid');
const { createHash } = require('crypto');

//CREATE AN ENTRY
router.post("/api/userPasswords", function(req, res, next) {
    let generatedSalt = crypto.randomBytes(15).toString();
    const userPassword = new userPasswordModel({
        _id: req.body.id,
        salt: generatedSalt,
        hashedPassword: hashPassword(req.params.hashedPassword + generatedSalt)
    });
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


/*This functions takes in the password that the user typed,
it adds the salt to it(a random word) and hashes it using sha256 */
function hashPassword(password) {
    return createHash('sha256').update(password).digest('hex');
}

module.exports = router;