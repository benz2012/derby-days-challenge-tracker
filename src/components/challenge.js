import React from 'react'

import Api from './api'

export default class Challenge extends React.Component {
  render() {
    const { number } = this.props
    return(
      <div className='row'>
        <div className='col-lg-12'>
          <h1>Challenge {number}</h1>
          <hr />
          <Api number={number} />
        </div>
      </div>
    )
  }
}
