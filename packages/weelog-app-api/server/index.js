const path = require('path')
const express = require('express')
const app = express()
const routes = require('./routes')

app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(routes)

module.exports = app
