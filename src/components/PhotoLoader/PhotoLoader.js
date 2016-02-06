import React, { Component } from 'react'
import FaPlus from 'react-icons/lib/fa/plus'

import '../Photo/Photo.css'
import './PhotoLoader.css'

export default class PhotoLoader extends Component {
  render()
  {
    const { store } = this.context
    console.log(store)
    return (
      <span className="photo photo--loader"><FaPlus /></span>
    )
  }
}
