const express = require("express")


const booking = express.Router()

const { bookingtModel } = require("../models/bookingModel")
const { FlightModel } = require("../models/flightModel")
const { UserModel } = require("../models/userModel")
const { authenticate } = require("../middlewares/authenticate")

booking.use(authenticate)

booking.get("/dashboard", async (req, res) => {
    try {
        let data = await bookingtModel.find({})
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

booking.post("/booking", async (req, res) => {
    let userid = req.body.userid
    try {
        let user = await UserModel.findOne({ _id: userid })
        let flight = await FlightModel.findOne({ _id: userid })
        let obj = {
            user: user,
            flight: flight
        }
        let booking = new bookingtModel(obj)
        await booking.save()
        res.status(201).send("booking success")
    } catch (error) {
        res.send(error)
    }
})



module.exports = { booking }