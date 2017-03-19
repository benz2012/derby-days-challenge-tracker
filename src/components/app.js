import React from 'react'

import Challenge from './challenge'
import Jumbotron from './jumbotron'

export default class App extends React.Component {
  render() {
    return(
      <div className='container'>
        <Jumbotron subTitle='Challenge Tracker 2017'>Derby Days</Jumbotron>
        <Challenge number='1' />
      </div>
    )
  }
}
