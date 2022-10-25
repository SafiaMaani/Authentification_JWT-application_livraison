require('dotenv').config()
const express = require('express')
const errorHandler = require('./Middlewares/ErrorHandler')
const cnxDb = require('./Config/db.config')

cnxDb()

//create an Express app:
const app = express()

const routerAuth = require('./Routes/AuthRoute')

app.use(express.json())
app.use('/api/user/', routerAuth)
app.use(errorHandler)

app.listen(1000)