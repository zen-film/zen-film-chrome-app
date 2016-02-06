import React, { Component } from 'react'

import './Photo.css'

export default class Photo extends Component {
  render()
  {
    let photo = this.props.photo
    let photoStyle = { backgroundImage: photo.url }
    return (
      <span className={photo.selected ? 'photo__wrap photo__wrap--selected': 'photo__wrap'}>
        <span className='photo' style={photoStyle}></span>
      </span>
    )
  }
}
