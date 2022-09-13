const express = require("express");
const userPasswordModel = require("../models/userPasswordModel");
const router = express.Router();
const uuid = require('uuid');


//CREATE AN ENTRY
router.post("/userPasswords", function(req, res, next){
    //const entry = new entryModel(req.body);
    const userPassword = new userPasswordModel({
        _id: uuid.v4(),
        location: "Sweden",
        text : "Had a fun time in Gothenburg",
        dates: {
            edited : new Date().toISOString().slice(0,10),
            date : new Date().toISOString().slice(0,10),
            created : new Date().toISOString().slice(0,10),
        }
    })
    userPassword.save(function (err,userPassword){
        if(err){return next(err);}
        res.status(201).json(userPassword);
    });
});

// SEND BACK ALL ENTRIES
router.get("/userPasswords", function (req, res, next){
    userPasswordModel.find(function(err, userPassword){
        if(err){return next(err);}
        res.json({"User Passwords": userPassword});
    })
});

router.get('/userPasswords/:id', function(req, res, next) {
    let id = req.params.id;
    userPasswordModel.findById(id, function(err, userPassword) {
        if (err) { return next(err); }
        if (userPassword === null) {
            return res.status(404).json({'message': 'User-password not found!'});
        }
        res.json(userPassword);
    });
});
router.put('/userPasswords/:id', function(req, res, next) {
    let id = req.params.id;
    console.log(id);
    userPasswordModel.findById(id, function(err, userPassword) {
        if (err) { return next(err); }
        if (userPassword == null) {
            return res.status(404).json({"message": "User-password not found"});
        }
        userPassword.save();
        res.json(userPassword);
    });
});

router.patch('/userPasswords/:id', function(req, res, next) {
    let id = req.params.id;
    userPasswordModel.findById(id, function(err, userPassword) {
        if (err) { return next(err); }
        if (userPassword == null) {
            return res.status(404).json(
                {"message": "User-password not found"});
        }
        userPassword.hashedPassword = req.body.hashedPassword;
        userPassword.save();
        res.json(userPassword);
    });
});

router.delete('/userPasswords', function(req, res, next) {
    userPasswordModel.deleteMany(function(err, userPassword) {
        if (err) { return next(err); }
        res.json({'User-password': userPassword });
    });
});

router.delete('/userPasswords/:id', function(req, res, next) {
    let id = req.params.id;
    userPasswordModel.findOneAndDelete({_id: id}, function(err, userPassword) {
        if (err) { return next(err); }
        if (userPassword === null) {
            return res.status(404).json({'message': 'User-password not found'});
        }
        res.json(userPassword);
    });
});




module.exports = router;