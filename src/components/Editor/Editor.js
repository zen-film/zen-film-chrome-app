import React, { Component } from 'react'
import UserBar from '../UserBar/UserBar'
import ActionBar from '../ActionBar/ActionBar'

import './Editor.css'

export default class Editor extends Component {
  renderEditor() {
    return
  }
  render()
  {
    console.log(this);
    return (
      <span className="editor"><UserBar dispatch={this.props.dispatch} user={this.props.user}/>{this.renderEditor()}</span>
    )
  }
}
