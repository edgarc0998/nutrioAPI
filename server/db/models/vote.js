const Sequelize = require('sequelize')
const db = require('../db')

const Vote = db.define('vote', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  framework: {
    type: Sequelize.STRING
  },
  sid: {
    type: Sequelize.STRING,
    unique: true
  }
})

module.exports = Vote
