import React from 'react'
import { observer } from 'mobx-react'
const socket = io()

import ChallengeChild from './challengeChild'
import store from '../store/dataStore'

export default observer(class Api extends React.Component {
  componentDidMount() {
    socket.emit('ready')
    socket.on('update_data', data => {
      store[this.props.number.toString()] = data
      console.log('data recieved: ', data)
    })
    socket.on('number_watching', num => {
      console.log('number watching: ', num)
    })
  }
  render() {
    const { number } = this.props
    return(
      <div>
        <div>
          <ChallengeChild
            number={number}
            data={store[number.toString()]}
          />
        </div>
      </div>
    )
  }
})
