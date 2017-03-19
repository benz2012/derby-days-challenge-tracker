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
          </div>
        </div>
      </div>
    )
  }
}
