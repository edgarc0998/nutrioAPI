const express = require('express')
const app = express()
const db = require('./db/postgres/db')
const path = require('path')
const PORT = process.env.PORT || 8080
const schedule = require('node-schedule')
const {exec} = require('child_process')

module.exports = app

var rule = new schedule.RecurrenceRule()
rule.hour = new schedule.Range(0, 24, 3)

schedule.scheduleJob(rule, function() {
  const child = exec(
    'npm run seed',
    {maxBuffer: 1024 * 10000},
    (error, stdout, stderr) => {
      if (error) {
        throw error
      }
      console.log(stdout)
    }
  )

  console.log(rule)
  console.log('SCHEDULE WORKED')
})

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

const server = app.listen(PORT, () =>
  console.log(`Mixing it up on port ${PORT}`)
)

async function start() {
  await db.sync()
  createApp()
}

start()
