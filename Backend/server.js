require('dotenv').config()
const express = require('express')
const cors = require('cors')
const errorHandler = require('./Middlewares/ErrorHandler')
const cnxDb = require('./Config/db.config')
const cookie = require('cookie-parser')
cnxDb()

//create an Express app:
const app = express()
app.use(cookie())
app.use(cors())

const routerAuth = require('./Routes/AuthRoute')
const routerAuthorization = require('./Routes/UserRoute')
app.use(cookie())
app.use(express.json())

//api/auth
app.use('/api/auth/', routerAuth)

//api/user
app.use('/api/user/', routerAuthorization)


// app.use(authenticateToken)
app.use(errorHandler)

app.listen(1000)