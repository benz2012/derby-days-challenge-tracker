import React from 'react'
const socket = io('/watching')

import Challenge from './challenge'
import Jumbotron from './jumbotron'

export default class App extends React.Component {
  render() {
    return(
      <div className='container'>
        <Jumbotron subTitle='Challenge Tracker 2017' socket={socket}>
          Derby Days
        </Jumbotron>
        <Challenge number='1'  socket={socket}/>
      </div>
    )
  }
}
