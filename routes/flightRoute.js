const express = require("express")


const flight = express.Router()

const { FlightModel } = require("../models/flightModel")


flight.get("/flights", async (req, res) => {
    try {
        let data = await FlightModel.find({})
        if (data) {
            res.status(200).send(data)
        } else {
            res.status(200).send({ "msg": "no flights available" })
        }
    } catch (error) {
        res.send("something wrong")
    }
})

flight.get("/flights/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let data = await FlightModel.find({ _id: id })
        if (data) {
            res.status(200).send(data)
        } else {
            res.status(200).send(`msg":"no flights available with given ${id}`)
        }
    } catch (error) {
        res.send("something wrong")
    }
})



flight.post("/flights", async (req, res) => {
    let { airline, flightNo, departure, arrival, departureTime, arrivalTime, seats, price } = req.body;
    try {
        let allFlight = await FlightModel.find({ flightNo })
        if (allFlight.length > 0) {
            res.status(400).send("flight already in the system")
        } else {
            const data = new FlightModel({ airline, flightNo, departure, arrival, departureTime, arrivalTime, seats, price })
            await data.save()
            res.status(200).send("flight added to system")
        }
    } catch (error) {
        res.send(error)
    }
})

flight.patch("/flights/:id", async (req, res) => {
    let ID = req.params.id;
    let payload = req.body
    try {
        let flight = await FlightModel.find({ _id: ID })
        if (flight.length === 0) {
            res.send(`no flight available with given ${ID}`)
        } else {
            await FlightModel.findByIdAndUpdate({ _id: ID }, payload)
            res.status(201).send(`flight with id ${ID} got updated`)
        }
    } catch (error) {
        res.send(error)
    }
})

flight.delete("/flights/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let flight = await FlightModel.find({ _id: id })
        if (flight.length === 0) {
            res.send(`no flight available with given ${id}`)
        } else {
            await FlightModel.findByIdAndDelete({ _id: id })
            res.status(202).send(`flight with id ${id} got deleted`)
        }
    } catch (error) {
        res.send(error)
    }
})

module.exports = { flight }