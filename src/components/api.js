import React from 'react'
import { observer } from 'mobx-react'
import 'isomorphic-fetch'
import 'es6-promise'

import ChallengeChild from './challengeChild'
import store from '../store/dataStore'

export default observer(class Api extends React.Component {
  constructor() {
    super()
    this.state = {
      dataStatus: 'NONE',
      uriList: {
        1: '/sheets'
      }
    }
  }
  componentWillMount(){
    this.loadData()
  }
  loadData() {
    this.setState({dataStatus: 'LOADING'})
    fetch(this.state.uriList[this.props.number], {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(json => this.parse(json))
    .catch(err => console.log(err))
  }
  parse(json) {
    const object = JSON.parse(json)
    this.setState({dataStatus: object.status})
    store[this.props.number.toString()] = object.payload
  }
  render() {
    const status = this.state.dataStatus
    const { number } = this.props
    const statusLabel = status !== 'SUCCESS' && status.toLowerCase()
    const challengeChild = status === 'SUCCESS' &&
      <ChallengeChild number={number} data={store[number.toString()]} />

    return(
      <div>
        <p className='text-info'>{statusLabel}</p>
        <div>{challengeChild}</div>
      </div>
    )
  }
})
