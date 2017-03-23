import React from 'react'

export default class Jumbotron extends React.Component {
  constructor() {
    super()
    this.state = {
      numWatching: 1
    }
  }
  componentDidMount() {
    this.props.socket.on('number_watching', num => {
      this.setState({numWatching: num})
    })
  }
  liveStyle(numWatching) {
    let height = 0
    let vis = false
    if (numWatching > 1) {
      height = 41
      vis = true
    }
    const transition = 'visibility 250ms, height 250ms linear';
    return {
      visibility: vis ? 'visible' : 'hidden',
      height: height + 'px',
      WebkitTransition: transition,
      MozTransition: transition,
      msTransition: transition,
      transition: transition,
    }
  }
  render() {
    const { subTitle } = this.props
    const { numWatching } = this.state
    const liveStyle = this.liveStyle(numWatching)
    return(
      <div className='row'>
        <div className='col-lg-12'>
          <div className='jumbotron' style={{marginBottom: 0}}>
            <h1>{this.props.children}</h1>
            <p>{subTitle}</p>
            <small>Updates Live, No Refreshing Needed</small>
          </div>
          <div style={liveStyle}>
            <ul className="nav nav-pills nav-stacked">
              <li className="active"><a>{numWatching} People Watching Live</a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
