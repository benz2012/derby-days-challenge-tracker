import React from 'react'

export default class TeamProfile extends React.Component {
  colors(team) {
    const colors = {
      'Sigma Chi': ['rgb(0, 157, 220)', 'rgb(255, 211, 80)'],
      'Alpha Xi Delta': ['rgb(28, 61, 128)', 'rgb(124, 188, 232)'],
      'Alpha Sigma Alpha': ['#DC143C', 'rgb(255,255,255)'],
      'Sigma Sigma Sigma': ['rgb(114,71,156)', 'rgb(255,255,255)'],
      'Zeta Tau Alpha': ['#40E0D0', 'rgb(150,150,150)'],
      'Delta Phi Epsilon': ['rgb(255,214,74)', 'rgb(114,71,156)'],
    }
    return colors[team]
  }
  profileStyle() {
    const shadow = '0px 0px 8px rgba(0,0,0,0.25)'
    return {
      // border: '1px solid rgb(230,230,230)',
      textAlign: 'center',
      marginRight: '10px',
      marginBottom: '10px',
      WebkitBoxShadow: shadow,
      MozBoxShadow: shadow,
      msBoxShadow: shadow,
      boxShadow: shadow,
    }
  }
  baseStyle(team) {
    const colors = this.colors(team)
    const textColor = (
      team == 'Zeta Tau Alpha' ||
      team == 'Delta Phi Epsilon' ?
      'rgb(51, 51, 51)' :
      'white'
    )
    return {
      // color: 'rgb(51, 51, 51)',
      color: textColor,
      // backgroundColor: 'rgb(230,230,230)',
      backgroundColor: colors[0],
      padding: team == 'Sigma Sigma Sigma' ? '10px 0px' : '10px 5px',
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
  centsToDollars(cents) {
    const centsStr = cents.toString()
    const len = centsStr.length
    const centsRemainder = centsStr.substring(len-2, len)
    const dollars = centsStr.substring(0, len-2)
    return dollars + '.' + centsRemainder
  }
  padCurrency(currency) {
    let head = '0'
    let tail = '00'
    const currencyStr = currency.toString()
    if (currencyStr.indexOf('.') == -1) {
      head = currencyStr
    } else {
      const sepIdx = currencyStr.indexOf('.')
      head = currencyStr.substring(0, sepIdx)
      if (head == '') {
        head = '0'
      }
      tail = currencyStr.substring(sepIdx+1)
      if (tail.length > 2) {
        tail = tail.substring(0, 2)
      } else if (tail.length == 1) {
        tail = tail + '0'
      } else if (tail.length == 0) {
        tail = '00'
      }
    }
    return head + '.' + tail
  }
  render() {
    const { name, chapter, number, raised,  members, current, projected } = this.props
    return(
      <div className='col-lg-2 col-md-3 col-sm-4 col-xs-6' style={{padding: 0}}>
        <div style={this.profileStyle()}>

          <div style={this.statisticStlye()}>
            { number == 0 &&
              <div>
                <div>Total Raised: ${this.padCurrency(raised)}</div>
              </div>
            }
            { number == 1 &&
              <div>
                <div>Members: {members}</div>
                <div>Current: ${
                  this.padCurrency(this.centsToDollars(current))
                }</div>
                <div>Projected: ${
                  this.padCurrency(this.centsToDollars(projected))
                }</div>
              </div>
            }
          </div>

          <div style={this.baseStyle(name)}>
            <h4 style={{margin: '0'}}>{name}</h4>
            <small>{chapter}</small>
          </div>

        </div>
      </div>
    )
  }
}
