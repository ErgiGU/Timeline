const express = require("express");
const userPasswordModel = require("../models/userPasswordModel");
const router = express.Router();
const bcrypt = require("bcrypt");

//CREATE AN ENTRY
router.post("/api/v1/userPasswords", async function (req, res, next) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userPassword = new userPasswordModel({
        _id: req.body._id,
        hashedPassword: hashedPassword
    });
    userPassword.save(function (err, userPassword) {
        try {
            if (err) {
                return next(err);
            }
            res.status(201).json(userPassword);
        }catch(err) {
            res.status(400).json({ message: err.message });
        }
    });
});

// SEND BACK ALL ENTRIES
router.get("/api/v1/userPasswords", function (req, res, next) {
    userPasswordModel.find(function (err, userPassword) {
        try {
            if (err) {
                return next(err);
            }
            res.status(200).json({"User Passwords": userPassword});
        }catch(err) {
            res.status(400).json({ message: err.message });
        }
    })
});

router.get('/api/v1/userPasswords/:id', function (req, res, next) {
    let id = req.params.id;
    try {
        userPasswordModel.findById(id, function (err, userPassword) {
            if (err) {
                return next(err);
            }
            if (userPassword === null) {
                return res.status(404).json({'message': 'User-password not found!'});
            }
            res.status(200).json(userPassword);
        });
    }catch(err) {
        res.status(400).json({ message: err.message });
    }

});

router.put('/api/v1/userPasswords/:id', function (req, res, next) {
    let id = req.params.id;
    console.log(id);
    userPasswordModel.findById(id, async function (err, userPassword) {
        try {
            if (err) {
                return next(err);
            }
            if (userPassword == null) {
                return res.status(404).json({"message": "User-password not found"});
            }
            userPassword.hashedPassword = await bcrypt.hash(req.body.password, 10);
            userPassword.save();
            res.status(201).json("User password updated.");
        }catch(err) {
            res.status(400).json({ message: err.message });
        }
    });
});

router.delete('/api/v1/userPasswords', function (req, res, next) {
    userPasswordModel.deleteMany(function (err, userPassword) {
        try {
            if (err) {
                return next(err);
            }
            res.status(200).json({'User-password': userPassword});
        }catch(err) {
            res.status(400).json({ message: err.message });
        }

    });
});

router.delete('/api/v1/userPasswords/:id', function (req, res, next) {
    let id = req.params.id;
    userPasswordModel.findOneAndDelete({_id: id}, function (err, userPassword) {
        try {
            if (err) {
                return next(err);
            }
            if (userPassword === null) {
                return res.status(404).json({'message': 'User-password not found'});
            }
            res.status(200).json(userPassword);
        }catch (err) {
            res.status(400).json({ message: err.message });
        }

    });
});


module.exports = router;