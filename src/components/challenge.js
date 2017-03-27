import React from 'react'

// import Api from './api'
import ChallengeChild from './challengeChild'

export default class Challenge extends React.Component {
  constructor() {
    super()
    this.state = {
      visibleLabel: 'hide ▲'
    }
  }
  changeVisible(e) {
    e.preventDefault();
    const { visibleLabel } = this.state
    if (visibleLabel === 'hide ▲') {
      this.setState({visibleLabel: 'show ▼'})
    } else if (visibleLabel === 'show ▼') {
      this.setState({visibleLabel: 'hide ▲'})
    }
  }
  render() {
    const { children, number, data } = this.props
    const { visibleLabel } = this.state
    return(
      <div className='row'>
        <div className='col-lg-12'>

          <div>
            <h1 style={{marginBottom: '0px'}}>
              {children}
            </h1>
            <small>
              <a href="#" onClick={this.changeVisible.bind(this)}>
                {visibleLabel}
              </a>
            </small>
          </div>

          <div>
            {
              visibleLabel === 'hide ▲' &&
              <div>
                <hr style={{clear: 'both', marginTop: '12px'}}/>
                <ChallengeChild number={number} data={data}/>
              </div>
            }
          </div>
          
        </div>
      </div>
    )
  }
}
