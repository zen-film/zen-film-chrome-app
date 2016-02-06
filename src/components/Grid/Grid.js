import React, { Component } from 'react'
import PhotoLoader from '../PhotoLoader/PhotoLoader'
import Photo from '../Photo/Photo'

import './Grid.css'

export default class Grid extends Component {
  constructor()
  {
    super()
  }

  renderGrid(photos)
  {
    return photos.map((photo) => <Photo photo={photo}/>)
  }
  render()
  {
    return (
      <span className="grid">{this.renderGrid(this.props.photos)}<PhotoLoader /></span>
    )
  }
}
