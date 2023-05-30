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
            }else{
                res.status(201).send({"err":"not working"})
            }
        });
    } catch (error) {
        console.log(error)
    } 
})

user.post("/login", async (req, res) => {
    let { email, password } = req.body;
    try {
        const user = await UserModel.find({email})
        const hashedPass = user[0].password
        if(user.length>0){
            bcrypt.compare(password, hashedPass, function(err, result) {
                if(result){
                    const token = jwt.sign({ email }, process.env.secretKey, { expiresIn: "1h" })
                    res.status(201).send({"msg":"loggin success","token":token})
                }else{
                    res.status(201).send({"err":"wrong password1"})
                }
            });
        }else{
            res.status(201).send({"err":"wrong password2"})
        }
    } catch (error) {
        res.status(201).send({"err":"wrong password3"})
    }

})


module.exports = { user }