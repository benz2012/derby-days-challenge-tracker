import React from 'react'

import TeamProfile from './teamProfile'
import { sortOrder } from './sortOrder'

export default class Challenge1 extends React.Component {
  mapTeams(data) {
    const teamList = []
    Object.keys(data.teams).forEach(teamKey => {
      let team = data.teams[teamKey]
      team.members = data.members[teamKey]
      teamList.push(team)
    })
    teamList.sort((a, b) => {
      const order = sortOrder()
      const aLocation = order.indexOf(a.name)
      const bLocation = order.indexOf(b.name)
      return aLocation - bLocation
    })
    var teamElements = teamList.map(team => {
      const teamEl = <TeamProfile key={team.name} name={team.name}
        chapter={team.chapter} members={this.computeMembers(team.members)}
        current={this.computeCurrentCents(team.members)} number={1}
        projected={this.computeProjectedCents(team.members)}
        url={team.team_page_url} />
      return teamEl
    })
    return teamElements
  }
  computeMembers(data) {
    let members = 0
    const today = new Date()
    const start = new Date('2017-03-20')
    const end = new Date('2017-04-22')
    if (today.getTime() < start.getTime()) {
      members = data['2017-03-20']
    } else if (today.getTime() > end.getTime()) {
      members = data['2017-04-22']
    } else {
      const key = `${today.getFullYear()}-${this.padDate(today.getMonth() + 1)}-${this.padDate(today.getDate())}`
      members = data[key]
    }
    return members
  }
  padDate(number) {
    if (number < 10) {
      number = '0' + number
    }
    return number
  }
  computeCurrentCents(data) {
    let currentTotal = 0
    Object.keys(data).forEach(key => {
      if (key.substring(0,4) == '2017') {
        if (new Date(key) <= new Date()) {
          currentTotal += data[key] * data.pledge
        }
      }
    })
    return currentTotal
  }
  computeProjectedCents(data) {
    let projectedTotal = 0
    Object.keys(data).forEach(key => {
      if (key.substring(0,4) == '2017') {
        projectedTotal += data[key] * data.pledge
      }
    })
    return projectedTotal
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
    const { data } = this.props
    let teamElements = [], acc = 0
    if (Object.keys(data).length !== 0) {
      teamElements = this.mapTeams(data)
      Object.keys(data.teams).forEach(teamKey => {
        const members = data.members[teamKey]
        acc += this.computeCurrentCents(members)
      })
    }
    return(
      <div>
        <blockquote>
          <p>Donation of 5¢ per-team-member, per-day, to each team, until the start of Derby Days.</p>
          <p>Total Accrued:&nbsp;
            <span className="text-success">
              ${this.padCurrency(this.centsToDollars(acc))}
            </span>
          </p>
        </blockquote>
        <div>
          {teamElements.length > 0 && teamElements}
        </div>
      </div>
    )
  }
}
