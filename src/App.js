import React, { Component } from 'react'
import { connect } from 'react-redux'

import Grid from './components/Grid/Grid'
import Editor from './components/Editor/Editor'
import UserSettings from './components/UserSettings/UserSettings'

const wrapStyle = {
  width: '100vw',
  height: '100vh',
  display: 'flex'
}

class App extends Component {
  render()
  {
    const dispatch = this.props.dispatch
    return <span style={wrapStyle}>
      { this.props.showUserSettings ? <UserSettings /> : <Grid photos={this.props.photos}/>}
      <Editor dispatch={dispatch} user={this.props.user}/>
    </span>
  }
}

export default connect((state) => {
  return {...state}
})(App)
