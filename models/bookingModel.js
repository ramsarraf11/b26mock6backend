const mongoose = require("mongoose")

const bookingtSchema = mongoose.Schema({
    user:Object,
    flight:Object
},{
    versionKey:false
})

const bookingtModel = mongoose.model("bookingtdata", bookingtSchema)

module.exports = {
    bookingtModel
}