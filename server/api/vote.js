const router = require('express').Router()
const {Vote} = require('../db/models/index')
module.exports = router

router.post('/:framework/:email', async (req, res, next) => {
  try {
    const newVote = await Vote.create({
      framework: req.params.framework,
      email: req.params.email,
      sid: req.sessionID
    })

    res.json(newVote)
  } catch (err) {
    res.json('error')
  }
})

router.get('/', async (req, res, next) => {
  try {
    const reactVotes = await Vote.findAll({
      where: {
        framework: 'React'
      }
    })

    const angularVotes = await Vote.findAll({
      where: {
        framework: 'Angular'
      }
    })

    const vueVotes = await Vote.findAll({
      where: {
        framework: 'Vue'
      }
    })

    const emberVotes = await Vote.findAll({
      where: {
        framework: 'Ember'
      }
    })

    const sidVoted = await Vote.findOne({
      where: {
        sid: req.sessionID
      }
    })

    const allVotes = {
      reactVotes: reactVotes.length,
      angularVotes: angularVotes.length,
      vueVotes: vueVotes.length,
      emberVotes: emberVotes.length
    }

    if (sidVoted) {
      allVotes.sidVoted = true
    }

    res.json(allVotes)
  } catch (err) {
    next(err)
  }
})
