import React from 'react'
import { observer } from 'mobx-react'
const socket = io()

import store from '../store/dataStore'
import Challenge from './challenge'
import Jumbotron from './jumbotron'

export default observer(class App extends React.Component {
  componentDidMount() {
    socket.emit('ready')
    socket.on('update_data', data => {
      store['MainData'] = data
      // console.log('data recieved: ', data)
    })
  }
  render() {
    return(
      <div className='container'>
        <Jumbotron subTitle='Challenge Tracker 2017' socket={socket}>
          Derby Days
        </Jumbotron>
        <Challenge number='0' data={store['MainData']}>
          The Derby Challenge
        </Challenge>
        <Challenge number='1' data={store['MainData']}>
          Challenge 1
        </Challenge>
      </div>
    )
  }
})
