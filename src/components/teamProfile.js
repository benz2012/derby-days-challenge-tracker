import React from 'react'

export default class TeamProfile extends React.Component {
  colors(team) {
    const colors = {
      'Sigma Chi': ['rgb(0, 157, 220)', 'rgb(255, 211, 80)'],
      'Alpha Xi Delta': ['rgb(124, 188, 232)', 'rgb(28, 61, 128)'],
      'Alpha Sigma Alpha': ['#DC143C', 'rgb(255,255,255)'],
      'Sigma Sigma Sigma': ['rgb(109,74,127)', 'rgb(255,255,255)'],
      'Zeta Tau Alpha': ['#40E0D0', 'rgb(150,150,150)'],
      'Delta Phi Epsilon': ['rgb(114,71,156)', 'rgb(255,215,0)'],
    }
    return colors[team]
  }
  profileStyle() {
    return {
      border: '1px solid rgb(230,230,230)',
      textAlign: 'center',
      marginRight: '10px',
      marginBottom: '10px',
    }
  }
  baseStyle() {
    return {
      color: 'rgb(51, 51, 51)',
      backgroundColor: 'rgb(230,230,230)',
      padding: '10px 5px 10px 5px',
    }
  }
  statisticStlye() {
    return {
      color: 'rgb(51, 51, 51)',
      padding: '15px 5px',
      textAlign: 'center'
    }
  }
  palette(team) {
    const colors = this.colors(team)
    const width = 100/colors.length
    let palette = []
    for (let i = 0; i < colors.length; i++) {
      const singleColor = <div key={i} style={{
        width: width + '%',
        borderBottom: '5px solid ' + colors[i],
        marginBottom: '0px',
        float: 'left'
      }}></div>
      palette.push(singleColor)
    }
    return palette
  }
  padCurrency(currency) {
    const currencyStr = currency.toString()
    const sepIdx = currencyStr.indexOf('.')
    let tail = currencyStr.substring(sepIdx+1)
    const head = currencyStr.substring(0, sepIdx)
    if (tail.length > 2) {
      tail = tail.substring(0, 2)
    } else if (tail.length == 1) {
      tail = tail + '0'
    } else if (tail.length == 0) {
      tail = '00'
    }
    return head + '.' + tail
  }
  render() {
    const { name, chapter, members, current, projected } = this.props
    return(
      <div className='col-lg-2 col-md-3 col-sm-4 col-xs-6' style={{padding: 0}}>
        <div style={this.profileStyle()}>

          <div>
            {this.palette(name)}
          </div>

          <div style={this.statisticStlye()}>
            <div>Members: {members}</div>
            <div>Current: ${this.padCurrency(current)}</div>
            <div>Projected: ${this.padCurrency(projected)}</div>
          </div>

          <div style={this.baseStyle()}>
            <h4 style={{margin: '0'}}>{name}</h4>
            <small>{chapter}</small>
          </div>

        </div>
      </div>
    )
  }
}
