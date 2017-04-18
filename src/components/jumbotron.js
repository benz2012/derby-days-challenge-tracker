import React from 'react'

export default class Jumbotron extends React.Component {
  constructor() {
    super()
    this.state = {
      numWatching: 1,
      outdated: false,
    }
  }
  componentDidMount() {
    this.props.socket.on('number_watching', num => {
      this.setState({numWatching: num})
    })
    this.props.socket.on('version', serverVersion => {
      if (this.props.version !== serverVersion) {
        this.setState({outdated: true})
      }
    })
  }
  render() {
    const { subTitle } = this.props
    const { numWatching, outdated } = this.state
    return(
      <div className='row'>
        <div className='col-lg-12'>
          <div className='jumbotron' style={{marginBottom: 0}}>
            <h1>{this.props.children}</h1>
            <p>{subTitle}</p>
            <p>Total Raised by All Teams: </p>
            <small>Updates Live, No Refreshing Needed</small>
          </div>
          {
            outdated ?
            <a href="http://derby-days.herokuapp.com" className="btn btn-danger btn-block">
              Your page is out of date, please refresh.
            </a>
            :
            <div>
              <ul className="nav nav-pills nav-stacked">
                <li className="active"><a>
                  {numWatching > 1 ? numWatching + ' People' : 'Only you are'} Watching Live
                </a></li>
              </ul>
            </div>
          }
        </div>
      </div>
    )
  }
}
