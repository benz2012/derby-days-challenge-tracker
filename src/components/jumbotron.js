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
  render() {
    const { subTitle } = this.props
    const { numWatching } = this.state
    return(
      <div className='row'>
        <div className='col-lg-12'>
          <div className='jumbotron' style={{marginBottom: 0}}>
            <h1>{this.props.children}</h1>
            <p>{subTitle}</p>
            <small>Updates Live, No Refreshing Needed</small>
          </div>
          <div>
            <ul className="nav nav-pills nav-stacked">
              <li className="active"><a>
                {numWatching > 1 ? numWatching + ' People' : 'Only you are'} Watching Live
              </a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
