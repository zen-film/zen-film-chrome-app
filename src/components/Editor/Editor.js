import React, { Component } from 'react'
import UserBar from '../UserBar/UserBar'
import ActionBar from '../ActionBar/ActionBar'

import styles from './Editor.css'

export default class Editor extends Component {
  renderEditor() {
    return <span className="editor__wrap"></span>
  }
  render()
  {
    console.log(styles);
    return (
      <span className="editor">
        <UserBar dispatch={this.props.dispatch} user={this.props.user}/>
        {this.renderEditor()}
        <ActionBar />
      </span>
    )
  }
}
