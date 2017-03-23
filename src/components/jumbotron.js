import React from 'react'
const socket = io()

export default class Jumbotron extends React.Component {
  constructor() {
    super()
    this.state = {
      numWatching: 0
    }
  }
  componentDidMount() {
    socket.on('number_watching', num => {
      this.setState({numWatching: num})
    })
  }
  render() {
    const { subTitle } = this.props
    const { numWatching } = this.state
    return(
      <div className='row'>
        <div className='col-lg-12'>
          <div className='jumbotron'>
            <h1>{this.props.children}</h1>
            <p>{subTitle}</p>
            <small>Updates Live, No Refreshing Needed</small>
            <small>
              <span class="badge">{numWatching} </span>
              People Watching Live
            </small>
          </div>
        </div>
      </div>
    )
  }
}
