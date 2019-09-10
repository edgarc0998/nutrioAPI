import React from 'react'
import axios from 'axios'
import {Input} from 'semantic-ui-react'
import {VictoryBar, VictoryChart, VictoryAxis} from 'victory'
import FrameworkCard from './frameworkCard'

const ChartCard = props => {
  var apiData = props.data
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
    </div>
  )
}

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      react: {},
      vue: {},
      ember: {},
      angular: {},
      email: '',
      allVotes: {
        reactVotes: 0,
        vueVotes: 0,
        angularVotes: 0,
        emberVotes: 0,
        sidVoted: false
      },
      emailVoted: false
      // time: new Date().toLocaleTimeString()
    }
    this.submitVote = this.submitVote.bind(this)
    this.getData = this.getData.bind(this)
  }

  async submitVote(framework, email) {
    var newVote = await axios.post(`/api/vote/${framework}/${email}`)

    if (newVote.data === 'error') {
      this.setState({
        emailVoted: true
      })
    }

    this.getData()
  }

  async getData() {
    const react = await axios.get('https://api.github.com/repos/facebook/react')

    const angular = await axios.get(
      'https://api.github.com/repos/angular/angular.js'
    )

    const ember = await axios.get(
      'https://api.github.com/repos/emberjs/ember.js'
    )
    const vue = await axios.get('https://api.github.com/repos/vuejs/vue')
    const allVotes = await axios.get('/api/vote')

    this.setState({
      react: react.data,
      angular: angular.data,
      vue: vue.data,
      ember: ember.data,
      allVotes: allVotes.data
    })

    //this is for testing, API kept giving me problems with calling it consistently
    // this.setState({
    //   react: {open_issues: 1000, forks: 100, watchers: 300},
    //   angular: {open_issues: 900, forks: 160, watchers: 200},
    //   vue: {open_issues: 500, forks: 50, watchers: 150},
    //   ember: {open_issues: 190, forks: 100, watchers: 30},
    //   allVotes: allVotes.data
    // })
  }

  componentDidMount() {
    setInterval(() => {
      this.getData()
      // this.setState({time: new Date().toLocaleTimeString()})
    }, 1000)
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          alignContent: 'center',
          height: '100%',
          flex: 1
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',
            height: '100%',
            marginBottom: 30
          }}
        >
          <ChartCard
            title="Watchers"
            data={[
              {x: 1, y: this.state.react.watchers},
              {x: 2, y: this.state.angular.watchers},
              {x: 3, y: this.state.vue.watchers},
              {x: 4, y: this.state.ember.watchers}
            ]}
          />
          <ChartCard
            title="Forks"
            data={[
              {x: 1, y: this.state.react.forks},
              {x: 2, y: this.state.angular.forks},
              {x: 3, y: this.state.vue.forks},
              {x: 4, y: this.state.ember.forks}
            ]}
          />
          <ChartCard
            title="Open Issues"
            data={[
              {x: 1, y: this.state.react.open_issues},
              {x: 2, y: this.state.angular.open_issues},
              {x: 3, y: this.state.vue.open_issues},
              {x: 4, y: this.state.ember.open_issues}
            ]}
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-evenly'
          }}
        >
          <FrameworkCard
            framework="React"
            email={this.state.email}
            submitVote={this.submitVote}
            votes={this.state.allVotes.reactVotes}
            color="crimson"
          />
          <FrameworkCard
            framework="Angular"
            email={this.state.email}
            submitVote={this.submitVote}
            votes={this.state.allVotes.angularVotes}
            color="navy"
          />
          <FrameworkCard
            framework="Vue"
            email={this.state.email}
            submitVote={this.submitVote}
            votes={this.state.allVotes.vueVotes}
            color="limegreen"
          />
          <FrameworkCard
            framework="Ember"
            email={this.state.email}
            submitVote={this.submitVote}
            votes={this.state.allVotes.emberVotes}
            color="orange"
          />
        </div>

        <div style={{marginTop: 30}}>
          {this.state.allVotes.sidVoted ? (
            <div style={{color: 'crimson'}}>
              You already voted on this computer
            </div>
          ) : this.state.emailVoted ? (
            <div style={{color: 'crimson'}}>
              You already voted with that email
            </div>
          ) : (
            <div>Enter your email to vote</div>
          )}

          <br />
          <Input
            id="emailInput"
            value={this.state.email}
            onChange={() => {
              this.setState({
                email: document.getElementById('emailInput').value
              })
            }}
            disabled={!!this.state.allVotes.sidVoted}
          />
        </div>
      </div>
    )
  }
}
