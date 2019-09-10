import React from 'react'
import axios from 'axios'
import {Input} from 'semantic-ui-react'
import {VictoryBar, VictoryChart, VictoryAxis} from 'victory'
import FrameworkCard from './frameworkCard'
import ChartCard from './chartCard'

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
    const react = await axios.get(
      'https://api.github.com/repos/facebook/react',
      {
        auth: {
          username: null,
          password: '23e8b418b3884c316a7f84d98554f830ea8a1243'
        }
      }
    )

    const angular = await axios.get(
      'https://api.github.com/repos/angular/angular.js',
      {
        auth: {
          username: null,
          password: '23e8b418b3884c316a7f84d98554f830ea8a1243'
        }
      }
    )

    const ember = await axios.get(
      'https://api.github.com/repos/emberjs/ember.js',
      {
        auth: {
          username: null,
          password: '23e8b418b3884c316a7f84d98554f830ea8a1243'
        }
      }
    )
    const vue = await axios.get('https://api.github.com/repos/vuejs/vue', {
      auth: {
        username: null,
        password: '23e8b418b3884c316a7f84d98554f830ea8a1243'
      }
    })
    const allVotes = await axios.get('/api/vote')

    this.setState({
      react: react.data,
      angular: angular.data,
      vue: vue.data,
      ember: ember.data,
      allVotes: allVotes.data
    })
  }

  componentDidMount() {
    setInterval(() => {
      this.getData()
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
            title="Stars"
            data={[
              {x: 1, y: this.state.react.stargazers_count},
              {x: 2, y: this.state.angular.stargazers_count},
              {x: 3, y: this.state.vue.stargazers_count},
              {x: 4, y: this.state.ember.stargazers_count}
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
