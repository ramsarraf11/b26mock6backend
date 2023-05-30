const express = require("express")
require('dotenv').config()
const { connection } = require("./configs/db")
const {user} = require("./routes/userRoute")
const {flight} = require("./routes/flightRoute")
const {booking} = require("./routes/bookingRoute")

const app = express()
app.use(express.json())

app.get("/",(req,res)=>{ 
    res.send("Home Page")
})

app.use("/api",user)
app.use("/api",flight)
app.use("/api",booking)

app.listen((process.env.port),async()=>{
    try {
        await connection
        console.log("db is connected")
    } catch (error) {
        
    }
    console.log(`server is on ${process.env.port}`)
})