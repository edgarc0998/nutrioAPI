import React from 'react'
import {VictoryBar, VictoryChart, VictoryAxis} from 'victory'

const ChartCard = props => {
  var apiData = props.data

  var heighest = ''
  var max = Math.max(apiData[0].y, apiData[1].y, apiData[2].y, apiData[3].y)

  if (apiData[0].y === max) {
    heighest = 'React'
    max = apiData[0].y
  } else if (apiData[1].y === max) {
    heighest = 'Angular'
    max = apiData[1].y
  } else if (apiData[2].y === max) {
    heighest = 'Vue'
    max = apiData[2].y
  } else if (apiData[3].y === max) {
    heighest = 'Ember'
    max = apiData[3].y
  }

  return (
    <div id="frameworkCont">
      <div>
        <h1 style={{color: 'white'}}>{props.title}</h1>
      </div>
      <VictoryChart
        domainPadding={40}
        style={{axisLabel: {fill: 'white', fontSize: 20}}}
      >
        <VictoryAxis
          style={{
            axis: {stroke: 'white', fill: 'white'},
            axisLabel: {fontSize: 20, padding: 30},
            ticks: {stroke: 'white', size: 5, fill: 'white'},
            tickLabels: {fontSize: 20, padding: 5, fill: 'white'}
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: {stroke: 'white', fill: 'white'},
            axisLabel: {fontSize: 20, padding: 30},
            ticks: {stroke: 'white', size: 5},
            tickLabels: {fontSize: 12, padding: 5, fill: 'white'}
          }}
        />
        <VictoryBar
          data={apiData}
          style={{
            data: {
              fill: data =>
                data.x === 1
                  ? 'crimson'
                  : data.x === 2
                    ? 'navy'
                    : data.x === 3
                      ? 'limegreen'
                      : data.x === 4 ? 'orange' : 'white',
              fillOpacity: 0.7,
              strokeWidth: 3
            },
            labels: {
              fill: 'white',
              fontSize: 15
            },
            axisLabel: {
              fill: 'white',
              fontSize: 20
            }
          }}
          labels={data =>
            data.x === 1
              ? 'React'
              : data.x === 2
                ? 'Angular'
                : data.x === 3 ? 'Vue' : data.x === 4 ? 'Ember' : ''
          }
        />
      </VictoryChart>

      <div>
        <h2 style={{color: 'white'}}>Heighest is: {heighest}</h2>
        <h2 style={{color: 'white'}}>
          {props.title}: {max}
        </h2>
      </div>
    </div>
  )
}

export default ChartCard
