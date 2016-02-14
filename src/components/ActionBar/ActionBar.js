import React, { Component } from 'react'
import FaPlayCircle from 'react-icons/lib/fa/play-circle'
import FaDownload from 'react-icons/lib/fa/download'
import FaShareAlt from 'react-icons/lib/fa/share-alt'

import './ActionBar.css'

class Action extends Component {
  render()
  {
    return (
      <span className="action__button" title={this.props.title} onClick={this.props.action}>{this.props.icon}</span>
    )
  }
}

export default class ActionBar extends Component {
  render()
  {
    var buttons = [
      {
        action: ()=>{},
        icon: <FaDownload />,
        title: 'Сохранить'
      },
      {
        action: ()=>{},
        icon: <FaPlayCircle />,
        title: 'Слайдшоу'
      },
      {
        action: ()=>{},
        icon: <FaShareAlt />,
        title: 'Поделиться'
      }
    ]
    return (
      <span className="action-bar">
        {buttons.map((btn)=><Action action={btn.action()} icon={btn.icon} title={btn.title} />)}
      </span>
    )
  }
}
