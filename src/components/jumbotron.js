import React from 'react'

export default class Jumbotron extends React.Component {
  render() {
    const { subTitle } = this.props
    return(
      <div className='row'>
        <div className='col-lg-12'>
          <div className='jumbotron'>
            <h1>{this.props.children}</h1>
            <p>{subTitle}</p>
            <small>Updates Live, No Refreshing Needed</small>
          </div>
        </div>
      </div>
    )
  }
}
