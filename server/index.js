const express = require('express')
const app = express()
const db = require('./db/postgres/db')
const path = require('path')

module.exports = app

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', require('./api'))

const createApp = () => {
  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  // auth and api routes
  // app.use('/auth', require('./auth'))
  app.use('/api', require('./api'))

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const server = app.listen(3000, () =>
  console.log(`Mixing it up on port ${3000}`)
)

async function start() {
  await db.sync()
  createApp()
  //await server();
}

start()
