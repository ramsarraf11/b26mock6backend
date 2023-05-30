const jwt = require("jsonwebtoken")
require('dotenv').config()


async function authenticate(req, res, next) {
    const token = request.headers.authorization
    try {
        if (token) {
            const decoded = jwt.verify(token, process.env.secretKey)
            if (decoded) {
                const userid = decoded.userid
                req.body.userid = userid
                next()
            } else {
                res.status(401).send({ message: "Invalid Token" })
            }
        } else {
            res.status(401).send({ message: "Invalid Token" })
        }
    } catch (error) {
        res.status(401).send({ message: error })
    }
}

module.exports = { authenticate }