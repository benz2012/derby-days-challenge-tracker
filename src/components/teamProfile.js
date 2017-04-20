import React from 'react'
import Chart from 'chart.js'

export default class TeamProfile extends React.Component {
  constructor() {
    super()
    this.state = {
      chart: null
    }
  }
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
    return {
      backgroundColor: colors[0],
      padding: team == 'Sigma Sigma Sigma' ? '10px 0px' : '10px 5px',
    }
  }
  linkStyle(team){
    const textColor = (
      team == 'Zeta Tau Alpha' ||
      team == 'Delta Phi Epsilon' ?
      'rgb(51, 51, 51)' :
      'white'
    )
    return {
      color: textColor,
    }
  }
  statisticStlye() {
    return {
      backgroundColor: 'white',
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
  chartStyle() {
    return {
      marginBottom: '0px',
    }
  }
  buildChart() {
    const { raisedOverTime, largest, name } = this.props
    const chartContext = document.getElementById(name + 'chart')
    const teamColor = this.colors(name)[0]
    let chartData = []
    let chartLabels = []
    Object.keys(raisedOverTime).forEach(date => {
      chartLabels.push(date)
      chartData.push(raisedOverTime[date])
    })
    const yScale = largest < 100 ? 100 : Math.ceil(largest/100)*100
    const step = (yScale/2)
    const teamChart = new Chart(chartContext, {
      type: 'line',
      data: {
        labels: chartLabels,
        datasets: [{
          data: chartData,
          fill: false,
          borderColor: teamColor,
          pointBorderWidth: 0,
          pointRadius: 0,
          pointBackgroundColor: teamColor,
          pointHoverRadius: 3, pointHitRadius: 3,
          lineTension: 0,
          borderJoinStyle: 'round',
        }]
      },
      options: {
        layout: {
          padding: {
            left: 10, right: 10, top: 20,
          }
        },
        legend: {
          display: false,
        },
        scales: {
          yAxes: [{
            ticks: {
              max: yScale,
              min: 0,
              stepSize: step
            }
          }],
          xAxes: [{
            display: false,
          }]
        }
      }
    })
  this.setState({chart: teamChart})
  }
  componentDidMount() {
    if (this.props.charts === 'hide charts ▲') {
      this.buildChart()
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.charts === 'show charts ▼' && this.props.charts === 'hide charts ▲') {
      this.buildChart()
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.charts === 'hide charts ▲' && nextProps.charts === 'show charts ▼') {
      this.state.chart.destroy()
    }
  }
  render() {
    const { name, chapter, number, raised, members, current,
      projected, url, charts } = this.props
    return(
      <div className='col-lg-2 col-md-3 col-sm-4 col-xs-6' style={{padding: 0}}>
        <div style={this.profileStyle()}>

          { number === 0 && charts === 'hide charts ▲' &&
            <canvas id={name + 'chart'} height='170'
              style={this.chartStyle()}></canvas>
          }

          <div style={this.statisticStlye()}>
            { number === 0 &&
              <div>
                <div>Total Raised: ${this.padCurrency(raised)}</div>
              </div>
            }
            { number === 1 &&
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
            <a href={url} target="_blank"
              style={this.linkStyle(name)}>
              <h4 style={{margin: '0'}}>{name}</h4>
              <small>
                {chapter}&nbsp;
                <span className="glyphicon glyphicon-link" style={{fontSize: 9}}></span>
              </small>
            </a>
          </div>

        </div>
      </div>
    )
  }
}
