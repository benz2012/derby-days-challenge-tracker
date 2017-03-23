import React from 'react'

import Api from './api'

export default class Challenge extends React.Component {
  constructor() {
    super()
    this.state = {
      visibleLabel: 'hide ▲'
    }
  }
  changeVisible() {
    const { visibleLabel } = this.state
    if (visibleLabel === 'hide ▲') {
      this.setState({visibleLabel: 'show ▼'})
    } else if (visibleLabel === 'show ▼') {
      this.setState({visibleLabel: 'hide ▲'})
    }
  }
  render() {
    const { number } = this.props
    const { visibleLabel } = this.state
    return(
      <div className='row'>
        <div className='col-lg-12'>
          <h1 style={{marginBottom: '5px'}}>Challenge {number}</h1>
          <small><a onClick={this.changeVisible().bind(this)}>{visibleLabel}</a></small>
          <hr style={{marginTop: '12px'}}/>
          { visibleLabel === 'hide ▲' && <Api number={number} />}
        </div>
      </div>
    )
  }
}
