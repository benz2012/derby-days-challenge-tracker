import React from 'react'

import TeamProfile from './teamProfile'

export default class Challenge1 extends React.Component {
  mapTeams(teamObjs) {
    const teamElements = []
    Object.keys(teamObjs).forEach(teamKey => {
      const team = teamObjs[teamKey]
      const teamEl = <TeamProfile key={team.Team} name={team.Team} chapter={team.Chapter}
        members={this.computeMembers(team)} current={this.computeCurrent(team)}
        number={1} projected={this.computeProjected(team)} />
      teamElements.push(teamEl)
    })
    return teamElements
  }
  computeMembers(data) {
    let members = 0
    const today = new Date()
    const start = new Date('2017/03/20')
    const end = new Date('2017/04/22')
    if (today.getTime() < start.getTime()) {
      members = data['2017/03/20']
    } else if (today.getTime() > end.getTime()) {
      members = data['2017/04/22']
    } else {
      const key = `${today.getFullYear()}/${this.padDate(today.getMonth() + 1)}/${this.padDate(today.getDate())}`
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
  computeCurrent(data) {
    let currentTotal = 0
    Object.keys(data).forEach(key => {
      if (key.substring(0,4) == '2017') {
        if (new Date(key) <= new Date()) {
          currentTotal += data[key] * data.PledgePerMember
        }
      }
    })
    return currentTotal
  }
  computeProjected(data) {
    let projectedTotal = 0
    Object.keys(data).forEach(key => {
      if (key.substring(0,4) == '2017') {
        projectedTotal += data[key] * data.PledgePerMember
      }
    })
    return projectedTotal
  }
  render() {
    const teamElements = this.mapTeams(this.props.data)
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
