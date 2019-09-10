import React from 'react'
import {Button} from 'semantic-ui-react'

const FrameworkCard = props => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '150px',
        width: '15%',
        backgroundColor: props.color,
        borderRadius: 20,
        padding: 10,
        color: 'white',
        justifyContent: 'space-evenly',
        alignContent: 'center',
        alignItems: 'center',
        opacity: 0.95
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {props.framework} Votes:
        <h1>{props.votes || 0}</h1>
      </div>

      <div>
        <Button
          onClick={() => {
            var email = document.getElementById('emailInput').value
            props.submitVote(props.framework, email)
          }}
          disabled={props.email === ''}
        >
          Vote
        </Button>
      </div>
    </div>
  )
}

export default FrameworkCard
