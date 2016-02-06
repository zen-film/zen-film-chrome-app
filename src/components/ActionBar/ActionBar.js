import React, { Component } from 'react'
import FaPlayCircle from 'react-icons/lib/fa/play-circle'
import FaDownload from 'react-icons/lib/fa/download'
import FaShareAlt from 'react-icons/lib/fa/share-alt'

import './ActionBar.css'

export class Action extends Component {
  render()
  {
    return (
      <span className="action__button" onClick={this.props.action}>{this.props.icon}</span>
    )
  }
}

export default class ActionBar extends Component {
  render()
  {
    return (
      <span className="action-bar">
        <Action action={()=>{}} icon={<FaDownload />} />
        <Action action={()=>{}} icon={<FaPlayCircle />} />
        <Action action={()=>{}} icon={<FaShareAlt />} />
      </span>
    )
  }
}
