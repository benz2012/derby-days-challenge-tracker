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
        number={0} chapter={team.chapter} raised={currentTotal} />
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
  render() {
    const { data } = this.props
    const teamElements = Object.keys(data).length !== 0 ?
      this.mapTeams(this.props.data) : []
    return(
      <div>
        <blockquote>
          <p>The Derby Challenge is a friendly competition amongst chapters raising funds for cancer research at Huntsman Cancer Institute.</p>
        </blockquote>
        <div>
          {teamElements.length > 0 && teamElements}
        </div>
      </div>
    )
  }
}
