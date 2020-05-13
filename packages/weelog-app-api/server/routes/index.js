const path = require('path')
const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.pipe(path.join(__dirname, 'public/index.html'))
})

router.get('/test', (req, res, next) => {
  res.pipe("API is running")
})

module.exports = router