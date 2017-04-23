import React from 'react'
import { observer } from 'mobx-react'
const socket = io()

import store from '../store/dataStore'
import Challenge from './challenge'
import Jumbotron from './jumbotron'

export default observer(class App extends React.Component {
  constructor() {
    super()
    this.state = {
      clientVersion: 116,
    }
  }
  componentDidMount() {
    socket.emit('ready')
    socket.on('update_data', data => {
      store['MainData'] = data
    })
  }
  appStyle() {
    return {
      paddingBottom: '30px',
    }
  }
  render() {
    return(
      <div style={this.appStyle()}>
        <div className='container'>
          <Jumbotron subTitle='Challenge Tracker 2017'
            socket={socket} version={this.state.clientVersion}>
            Derby Days
          </Jumbotron>
          <Challenge number='0' data={store['MainData']}>
            The Derby Challenge
          </Challenge>
          <Challenge number='1' data={store['MainData']}>
            Challenge 1
          </Challenge>
          <Challenge number='2' data={store['MainData']['fight']}>
            Challenge 2
          </Challenge>
          <Challenge number='3' data={store['MainData']['scavenger']}>
            Challenge 3
          </Challenge>
        </div>
      </div>
    )
  }
})
