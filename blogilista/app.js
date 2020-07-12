const config = require('./utils/config')
const usersRouter = require('./controllers/users')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require("./controllers/blogs")
const loginRouter = require('./controllers/login')


const tokenExtractor = (req, res, next) => {
        const auth = req.get('authorization')
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            req.token = auth.substring(7)
        }
    next()
}

const tokenError = (error, req, res, next) => {
    if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'invalid token' })
    }
    next()
}

const logger = (req, res, next) => {
    console.log(req.method);
    console.log(req.originalUrl);
    
    next()
}

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})

app.use(logger)
app.use(tokenExtractor)
app.use(cors())
app.use(express.json())
app.use("/api/blogs", blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/reset')
    app.use('/api/testing', testingRouter)
}

app.use(tokenError)


module.exports = app