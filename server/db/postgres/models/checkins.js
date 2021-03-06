const Sequelize = require('sequelize')
const db = require('../db')

const Checkins = db.define('checkins', {
  caloriesBurned: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  caloriesConsumed: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  weight: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0
  }
})

Checkins.afterCreate(async checkin => {
  if (checkin.weight === 0) {
    const prevCheckin = await Checkins.findOne({
      where: {id: checkin.id - 1}
    })
    checkin.weight = prevCheckin.weight
    return checkin
  }
})
module.exports = Checkins
