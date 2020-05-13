const express = require('express')()

express.get('/', (q, r) => { r.end('weelog-post-service is running') })

module.exports = express