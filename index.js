const path = require('path')

const express = require('express')
const logger = require('morgan')
const hbs = require('express-hbs')

const app = express()
const index = require('./routes/index')

app.use(logger('dev'))
app.engine('hbs', hbs.express4({
  partialsDir: path.join(__dirname, '/views/partials')
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use('/', index)

app.use((req, res, next) => {
  let err = new Error('Not found')

  err.status = 400
  next(err)
})

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development'
    ? err
    : {}

  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
