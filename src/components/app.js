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
      clientVersion: 122,
      outdated: false,
    }
  }
  componentDidMount() {
    socket.emit('ready')
    socket.on('update_data', data => {
      store['MainData'] = data
    })
    socket.on('version', serverVersion => {
      if (this.state.clientVersion !== serverVersion) {
        this.setState({outdated: true})
      }
    })
  }
  appStyle() {
    return {
      paddingBottom: '30px',
    }
  }
  warningStyle() {
    return {
      position: 'fixed',
      left: '0',
      top: '0',
      width: '100%',
      zIndex: '999',
    }
  }
  render() {
    const { outdated } = this.state
    return(
      <div style={this.appStyle()}>

        {
          outdated &&
          <div style={this.warningStyle()}>
            <a href="http://derby-days.herokuapp.com" className="btn btn-danger btn-block">
              <strong>Your page is out of date, please refresh.</strong>
            </a>
          </div>
        }

        <div className='container'>
          <Jumbotron subTitle='Challenge Tracker 2017'
            socket={socket}>
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
