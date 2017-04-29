import React from 'react'

import TeamProfile from './teamProfile'
import { sortOrder } from './sortOrder'

export default class Challenge0 extends React.Component {
  mapTeams(data) {
    const teamList = []
    const largestTotal = this.largestSororityTotal(data)
    Object.keys(data.teams).forEach(teamKey => {
      let team = data.teams[teamKey]
      team.raised = data.raised[teamKey]
      team.largest = team.name === 'Sigma Chi' ? this.currentTotal(team.raised) + 5 : largestTotal
      teamList.push(team)
    })
    teamList.sort((a, b) => {
      const order = sortOrder()
      const aLocation = order.indexOf(a.name)
      const bLocation = order.indexOf(b.name)
      return aLocation - bLocation
    })
    const teamElements = teamList.map(team => {
      let currentTotal = this.currentTotal(team.raised)
      if (team.name === 'Sigma Chi') {
        currentTotal += 5 // $5 from Lambda Kappa leader page
      }
      if (team.name === 'Sigma Sigma Sigma') {
        currentTotal += 1500 // $1500 from SSS
        team.raised = this.adjustGraphData(team.raised)
        // console.log(team.raised)
      }
      const teamEl = <TeamProfile key={team.name} name={team.name}
        number={0} chapter={team.chapter} raised={currentTotal}
        url={team.team_page_url} charts={this.props.charts}
        raisedOverTime={team.raised} largest={team.largest} />
      return teamEl
    })
    return teamElements
  }
  currentTotal(raised) {
    const today = new Date()
    const todayKey = this.structureKey(today)
    let currentTotal = 0;
    Object.keys(raised).forEach(dateKey => {
      if (dateKey === todayKey) {
        currentTotal = raised[dateKey]
      }
    })
    return currentTotal
  }
  yesterdayTotal(raised) {
    let yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yKey = this.structureKey(yesterday)
    let yesterdayTotal = 0;
    Object.keys(raised).forEach(dateKey => {
      if (dateKey === yKey) {
        yesterdayTotal = raised[dateKey]
      }
    })
    return yesterdayTotal
  }
  adjustGraphData(raised) {
    const begin = new Date('2017-04-28')
    Object.keys(raised).forEach(dateKey => {
      const date = new Date(dateKey)
      // console.log(date, ' ? ', begin)
      if (date >= begin) {
        // raised[dateKey] += 1500
      }
    })
    return raised
  }
  structureKey(date) {
    const key = date.getFullYear() + '-' +
      this.padDate(date.getMonth() + 1) + '-' +
      this.padDate(date.getDate())
    return key
  }
  padDate(number) {
    if (number < 10) {
      number = '0' + number
    }
    return number
  }
  allTeamTotal(data) {
    let total = 5 + 1500 // $5 from Lambda Kappa leader page, $1500 tri sigma
    let yTotal = 5
    Object.keys(data.teams).forEach(teamKey => {
      const teamTotal = this.currentTotal(data.raised[teamKey])
      const yesterdayTotal = this.yesterdayTotal(data.raised[teamKey])
      total += teamTotal
      yTotal += yesterdayTotal
    })
    return [total, yTotal]
  }
  largestSororityTotal(data) {
    let largest = 0
    Object.keys(data.teams).forEach(teamKey => {
      if (teamKey === 'sigmachi') { return }
      let teamTotal = this.currentTotal(data.raised[teamKey])
      if (teamKey === 'sigmasigmasigma') {
        teamTotal += 1500
      }
      if (teamTotal > largest) {
        largest = teamTotal
      }
    })
    return largest
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
    const { data } = this.props
    let teamElements = []
    let allTeamTotal = 0
    let allTeamPercentage = 0
    if (Object.keys(data).length !== 0) {
      teamElements = this.mapTeams(this.props.data)
      const totals = this.allTeamTotal(data)
      allTeamTotal = this.padCurrency(totals[0])
      // console.log(totals[0], totals[1])
      allTeamPercentage = String(((totals[0]-totals[1])/totals[1])*100, 1).substring(0,3)
      if (allTeamPercentage.charAt(allTeamPercentage.length-1) === '.') {
        allTeamPercentage = allTeamPercentage.substring(0,allTeamPercentage.length-1)
      }
    }
    return(
      <div>
        <blockquote>
          <p>The Derby Challenge is a friendly competition amongst chapters raising funds for cancer research at Huntsman Cancer Institute.</p>
          <p>Total Raised by All Teams: <span className="text-success">
            ${allTeamTotal}</span></p>
            <small>Today's Increase: +{allTeamPercentage}%</small>
        </blockquote>
        <div>
          {teamElements.length > 0 && teamElements}
        </div>
        <small>* includes donations not made thru the Derby Challenge website</small>
      </div>
    )
  }
}
