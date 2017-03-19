import React from 'react'

import Api from './api'

export default class Challenge extends React.Component {
  render() {
    const { number } = this.props
    return(
      <div className='row'>
        <div className='col-lg-12'>
          <h1 style={{marginBottom: '5px'}}>Challenge {number}</h1>
          <small style={{marginLeft: '2px'}}>Data pulled from <a href='http://www.derbychallenge.org/' target="_blank">Derby Challenge</a> every 2 minutes</small>
          <hr style={{marginTop: '12px'}}/>
          <Api number={number} />
        </div>
      </div>
    )
  }
}
