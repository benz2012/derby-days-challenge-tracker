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
          <div className='jumbotron'>
            
            <h1>{this.props.children}</h1>
            <p>{subTitle}</p>

            <ul className="nav nav-pills nav-stacked">
              <li>Updates Live, No Refreshing Needed</li>
              <li className="active">
                {numWatching} {numWatching > 1 ? 'People' : 'Person'} Watching Live
              </li>
            </ul>

          </div>
        </div>
      </div>
    )
  }
}
