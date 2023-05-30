const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()


const { UserModel } = require("../models/userModel")

const user = express.Router()


user.post("/register", async (req, res) => {
    let { name, email, password } = req.body;
    try {
        bcrypt.hash(password, 5, async function (err, hash) {
            if (!err) {
                let data = new UserModel({ name, email, password: hash })
                await data.save()
                res.status(200).send("New User Registered")
            } else {
                res.status(201).send({ "err": "not working" })
            }
        });
    } catch (error) {
        console.log(error)
    }
})

user.post("/login", async (req, res) => {
    let { email, password } = req.body;
    try {
        const user = await UserModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password, hash, function (err, result) {
                if (result) {
                    const token = jwt.sign({ userid:user[0]._id }, process.env.secretKey, { expiresIn: "1h" })
                    res.status(201).send({ "msg": "loggin success", "token": token })
                } else {
                    res.status(201).send({ "err": "wrong password" })
                }
            });
        } else {
            res.status(201).send({ "err": "user not found" })
        }
    } catch (error) {
        res.status(201).send({ "err": "something wrong" })
        console.log(error)
    }

})


module.exports = { user }