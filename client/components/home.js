import React from 'react'

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {}
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
        <h1>Hello world</h1>
      </div>
    )
  }
}
