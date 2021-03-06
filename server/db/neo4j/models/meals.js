const {session} = require('../db')

const createMeal = meal => {
  session
    .run(
      `MERGE (m:Meal {id: toInteger($id)})
      ON CREATE SET m += {
        name: $name,
        totalCalories: $totalCalories,
        totalCarbs: $totalCarbs,
        totalFat: $totalFat,
        totalProtein: $totalProtein,
        entreeType: $entreeType
      }
      ON MATCH SET m += {
        name: $name,
        totalCalories: $totalCalories,
        totalCarbs: $totalCarbs,
        totalFat: $totalFat,
        totalProtein: $totalProtein,
        entreeType: $entreeType
      }
      RETURN m`,
      {
        id: meal.id,
        name: meal.name,
        totalCalories: meal.calories,
        totalCarbs: meal.carbs,
        totalFat: meal.fat,
        totalProtein: meal.protein,
        entreeType: meal.entreeType
      }
    )
    .then(result => {
      session.close()
      if (!result.records.length) return null
      const record = result.records[0]
      const response = record.get('m')
      return response
    })
    .catch(error => {
      session.close()
      throw error
    })
}

const getRecommendedMeals = meal => {
  return session
    .run(
      `MATCH ()-[r:HAD_MEAL]->(m:Meal {entreeType: $type})
    WHERE 0 < m.totalCalories < $calories AND 0 < m.totalCarbs < $carbs AND  0 < m.totalFat < $fat AND 0 < m.totalProtein < $protein
    RETURN sum(r.timesEaten) as total, m.id
    ORDER BY total DESC`,
      {
        calories: meal.calories,
        carbs: meal.carbs,
        fat: meal.fat,
        protein: meal.protein,
        type: meal.type
      }
    )
    .then(result => {
      session.close()
      return (res = result.records.map(rec => {
        return rec.get('m.id').low
      }))
    })
    .catch(error => {
      session.close()
      throw error
    })
}

module.exports = {createMeal, getRecommendedMeals}
