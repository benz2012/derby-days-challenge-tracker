import React from 'react'

import TeamProfile from './teamProfile'
import { sortOrder } from './sortOrder'

export default class Challenge0 extends React.Component {
  mapTeams(data) {
    const teamList = []
    Object.keys(data.teams).forEach(teamKey => {
      let team = data.teams[teamKey]
      team.raised = data.raised[teamKey]
      teamList.push(team)
    })
    teamList.sort((a, b) => {
      const order = sortOrder()
      const aLocation = order.indexOf(a.name)
      const bLocation = order.indexOf(b.name)
      return aLocation - bLocation
    })
    var teamElements = teamList.map(team => {
      const currentTotal = this.currentTotal(team.raised)
      const teamEl = <TeamProfile key={team.name} name={team.name}
        number={0} chapter={team.chapter} raised={currentTotal}
        url={team.team_page_url}/>
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
    let total = 0
    Object.keys(data.teams).forEach(teamKey => {
      const teamTotal = this.currentTotal(data.raised[teamKey])
      total += teamTotal
    })
    return total
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
    if (Object.keys(data).length !== 0) {
      teamElements = this.mapTeams(this.props.data)
      allTeamTotal = this.padCurrency(this.allTeamTotal(data))
    }
    return(
      <div>
        <blockquote>
          <p>The Derby Challenge is a friendly competition amongst chapters raising funds for cancer research at Huntsman Cancer Institute.</p>
          <p>Total Raised by All Teams: <span className="text-success">${allTeamTotal}</span></p>
        </blockquote>
        <div>
          {teamElements.length > 0 && teamElements}
        </div>
      </div>
    )
  }
}
