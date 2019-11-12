const neo4j = require('neo4j-driver').v1
console.log(
  'auth',
  process.env.GRAPHENEDB_BOLT_URL,
  'user: ',
  process.env.GRAPHENEDB_BOLT_USER,
  'pass',
  process.env.GRAPHENEDB_BOLT_PASSWORD
)
const driver = neo4j.driver(
  process.env.GRAPHENEDB_BOLT_URL || 'bolt://localhost',
  neo4j.auth.basic(
    process.env.GRAPHENEDB_BOLT_USER || 'neo4j',
    process.env.GRAPHENEDB_BOLT_PASSWORD || 'fullstack'
  ) //set password in Process.ENV
)
const session = driver.session()

const resetDB = () => {
  session
    .run(`MATCH (n) DETACH DELETE n`)
    .then(result => {
      session.close()
      return result
    })
    .catch(error => {
      session.close()
      throw error
    })
}

module.exports = {
  driver,
  session,
  resetDB
}
