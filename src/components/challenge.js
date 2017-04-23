import React from 'react'

// import Api from './api'
import ChallengeChild from './challengeChild'

export default class Challenge extends React.Component {
  constructor() {
    super()
    this.state = {
      visibleLabel: 'hide ▲',
      chartsVisible: 'show charts ▼',
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
  changeCharts(e) {
    e.preventDefault();
    const { chartsVisible } = this.state
    if (chartsVisible === 'hide charts ▲') {
      this.setState({chartsVisible: 'show charts ▼'})
    } else if (chartsVisible === 'show charts ▼') {
      this.setState({chartsVisible: 'hide charts ▲'})
    }
  }
  componentDidMount() {
    if (this.props.number === '1') {
      this.setState({visibleLabel: 'show ▼'})
    }
  }
  render() {
    const { children, number, data } = this.props
    const { visibleLabel, chartsVisible } = this.state
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
              { number == 0 &&
                <a href="#" onClick={this.changeCharts.bind(this)} style={{marginLeft: 15}}>
                  {chartsVisible}
                </a>
              }
            </small>
          </div>

          <div>
            {
              visibleLabel === 'hide ▲' &&
              <div>
                <hr style={{clear: 'both', marginTop: '12px'}}/>
                <ChallengeChild number={number} data={data}
                  charts={chartsVisible} visible={visibleLabel} />
              </div>
            }
          </div>

        </div>
      </div>
    )
  }
}
