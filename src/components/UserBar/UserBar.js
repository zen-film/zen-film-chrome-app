import React, { Component } from 'react'
import FaUserSecret from 'react-icons/lib/fa/user-secret'
import FaSignIn from 'react-icons/lib/fa/sign-in'
import FaSignOut from 'react-icons/lib/fa/sign-out'

import {showSettings, hideSettings, toggleSettings} from '../../actions/userActions'

import './UserBar.css'

export class UserPhoto extends Component {
  render()
  {
    let isLogin = false;
    return (
      <span className="user__photo">{this.props.isLogin ? '' : <FaUserSecret />}</span>
    )
  }
}

export class UserName extends Component {
  render()
  {
    return <span className="user__name">{this.props.name}</span>
  }
}

export class UserAction extends Component {
  render()
  {
    let isLogin = false
    return (
      <span className="user__action" onClick={this.props.action}>{this.props.icon}</span>
    )
  }
}

export default class UserBar extends Component {
  render()
  {
    let isLogin = this.props.user.isLogin
    console.log(this);
    let dispatch =  this.props.dispatch
    return (
      <span className="user">
        <span className="user__wrap" onClick={()=>{dispatch(toggleSettings)}}>
          <UserPhoto />
          <UserName name={isLogin ? 'user__name' : 'Anonymous'} />
        </span>
        <UserAction action={()=>{console.log('lol')}} icon={isLogin ? <FaSignOut /> : <FaSignIn />}/>
      </span>
    )
  }
}
