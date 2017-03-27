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
        projected={this.computeProjectedCents(team.members)} />
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
  render() {
    const { data } = this.props
    const teamElements = Object.keys(data).length !== 0 ?
      this.mapTeams(data) : []
    return(
      <div>
        <blockquote>
          <p>Donation of 5¢ per-team-member, per-day, to each team, until the start of Derby Days.</p>
        </blockquote>
        <div>
          {teamElements.length > 0 && teamElements}
        </div>
      </div>
    )
  }
}
