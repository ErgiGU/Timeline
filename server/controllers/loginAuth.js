const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const userAccountModel = require("../models/userAccountModel");
const userPassword = require("../models/userPasswordModel");
const auth = require("../middleware/auth");

router.get("/api/v1/getEmail", async function (req, res, next) {
    const email1 = req.body.email;
    userAccountModel.findOne({email: email1}, function (err, userAccount) {
        if (err) {
            return next(err)
        }
        if (userAccount === null) {
            res.send("Email not found")
        } else {
            res.send("Email already exists")
        }

    })
})

router.post('/api/v1/login', async (req, res, next) => {
    const email1 = req.body.email;
    userAccountModel.findOne({email: email1}, function (err, userAccount) {
        if (err) {
            return next(err);
        }
        if (userAccount === null) {
            return res.status(404).json({'message': 'User not found'});
        } else {
            const id = userAccount._id;
            userPassword.findOne({_id: id}, async function (err, userPassword) {
                if (err) {
                    return next(err);
                }
                if (await bcrypt.compare(req.body.password, userPassword.hashedPassword)) {
                    const token = userAccount.generateToken();
                    return res.json({
                        message: "Success",
                        userAccount: userAccount,
                        token: token
                    });
                } else {
                    return res.send('Invalid password');
                }
            });
        }
    })
});

router.get("/api/v1/verifyPassword", async function (req, res, next) {
    const id = req.body._id;
    userPassword.findOne({_id: id}, async function (err, userPassword) {
        if (err) {
            return next(err)
        }
        if (userPassword === null) {
            res.send("Password wrong")
        } else {
            if (await bcrypt.compare(req.body.password, userPassword.hashedPassword)) {
                res.send("Password correct")
            }
        }

    })
})

router.post('/api/v1/checkEmail', async (req, res, next) => {
    const email1 = req.body.email;
    userAccountModel.findOne({email: email1}, function (err, userAccount) {
        if (err) {
            return next(err);
        }
        if (userAccount === null) {
            return res.status(404).json({'message': 'Email not found'});
        } else {
            return res.status(200).send("Email already exists");
        }
    })
})


module.exports = router;







