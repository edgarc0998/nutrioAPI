const router = require('express').Router()
const {
  Users,
  DailyGoals,
  LongTermGoals
} = require('../db/postgres/models/index')
module.exports = router

function getWeeksLeft(statedGoal, goalWeight, currentWeight) {
  var cals
  if (statedGoal === 'Gain 1 lb a week') {
    cals = 500
  } else if (statedGoal === 'Gain 0.5 lb a week') {
    cals = 250
  } else if (statedGoal === 'Maintain current weight') {
    cals = 0
  } else if (statedGoal === 'Lose 0.5 lb a week') {
    cals = 250
  } else if (statedGoal === 'Lose 1 lb a week') {
    cals = 500
  } else if (statedGoal === 'Lose 1.5 lbs a week') {
    cals = 750
  } else if (statedGoal === 'Lose 2 lbs a week') {
    cals = 1000
  }

  var lbsPerWeek = cals * 7 / 3500

  var weeksLeft = (goalWeight - currentWeight) / lbsPerWeek

  return Math.abs(weeksLeft)
}

function formatDate(oldDate) {
  var newDate
  var year = oldDate.getFullYear().toString()
  var month = (oldDate.getMonth() + 1).toString()
  var day = oldDate.getDate().toString()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  newDate = month + '-' + day + '-' + year
  return newDate
}

router.get('/', async (req, res, next) => {
  try {
    const me = await Users.findOne({
      where: {
        id: 1 //fix later
      },
      include: [DailyGoals, LongTermGoals]
    })

    res.json(me)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const me = await Users.findOne({
      where: {
        id: 1 //fix later
      }
    })

    const longTermGoal = await LongTermGoals.findOne({
      where: {
        userId: 1 //fix later
      }
    })

    await me.update({
      height: req.body.height,
      weight: req.body.weight,
      activityLevel: req.body.activityLevel,
      bodyType: req.body.bodyType
    })

    var newEndDate = new Date()

    let numWeeks = getWeeksLeft(
      req.body.statedGoal,
      req.body.startWeight,
      req.body.endingWeight
    )
    newEndDate.setDate(newEndDate.getDate() + numWeeks * 7)

    var newEndDate = formatDate(newEndDate)
    var newStartDate = formatDate(new Date())

    await longTermGoal.update({
      startWeight: req.body.startWeight,
      endingWeight: req.body.endingWeight,
      startDate: newStartDate,
      endDate: newEndDate,
      statedGoal: req.body.statedGoal
    })

    res.json(me)
  } catch (err) {
    next(err)
  }
})
