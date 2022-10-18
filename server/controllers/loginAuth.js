const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const userAccountModel = require("../models/userAccountModel");
const userPassword = require("../models/userPasswordModel");

router.post("/api/v1/login", async (req, res, next) => {
    const email1 = req.body.email;
    userAccountModel.findOne({email: email1}, function (err, userAccount) {
        try {
            if (err) {
                return next(err);
            }
            if (userAccount === null) {
                return res.status(404).json({'message': "Invalid email"});
            } else {
                const id = userAccount._id;
                userPassword.findOne({_id: id}, async function (err, userPassword) {
                    if (err) {
                        return next(err);
                    }
                    if (await bcrypt.compare(req.body.password, userPassword.hashedPassword)) {
                        const token = userAccount.generateToken();
                        return res.status(200).json({
                            message: "Success",
                            userAccount: userAccount,
                            token: token
                        });
                    } else {
                        return res.status(404).json({'message': "Invalid password"});
                    }
                });
            }
        }catch(err) {
            res.status(400).json({ message: err.message });
        }
    })
});

router.post("/api/v1/verifyPassword",  function (req, res, next) {
    const id = req.body._id;
    userPassword.findOne({_id: id}, async function (err, userPassword) {
        try {
            if (err) {
                return next(err)
            }
            if (await bcrypt.compare(req.body.password, userPassword.hashedPassword)) {
                res.status(200).json({'message': "Correct password"})
            }else{
                res.status(404).json({'message': "Invalid password"})
            }
        }catch(err) {
            res.status(400).json({ message: err.message });
        }
    })

})

router.post("/api/v1/checkEmail", async (req, res, next) => {
    const email1 = req.body.email;
    userAccountModel.findOne({email: email1}, function (err, userAccount) {
        try {
            if (err) {
                return next(err);
            }
            if (userAccount === null) {
                return res.status(204).json({'message': 'Email not found'});
            } else {
                return res.status(200).send({'message': "Email already exists"});
            }
        }catch(err) {
            res.status(400).json({ message: err.message });
        }
    })
})


module.exports = router;







