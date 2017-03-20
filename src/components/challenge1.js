import React from 'react'

import TeamProfile from './teamProfile'

export default class Challenge1 extends React.Component {
  constructor() {
    super()
    this.state = {
      numCols: 7,
      teamElements: []
    }
  }
  componentWillReceiveProps(nextProps) {
    const dataInColumns = this.rowsToColumns(nextProps.data)
    this.mapTeams(dataInColumns)
  }
  rowsToColumns(dataInRows) {
    const { numCols } = this.state
    const dataInColumns = []
    for (let i = 1; i < numCols; i++) {
      const column = {}
      for (let key of Object.keys(dataInRows)) {
        const row = dataInRows[key]
        const attribute = this.trim(row[0].toString())
        if (i >= row.length) { continue }
        const value = row[i]
        column[attribute] = value
      }
      dataInColumns.push(column)
    }
    return dataInColumns
  }
  trim(str) {
    str = str.replace('\u00A0','')
    return str.replace(/^\s+|\s+$/g, '')
  }
  mapTeams(teams) {
    const teamElements = teams.map(team => (
      <TeamProfile key={team.Team} name={team.Team} chapter={team.Chapter}
        members={this.computeMembers(team)} current={team.CurrentTotal}
        projected={team.ProjectedTotal} />
    ))
    this.setState({teamElements: teamElements})
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
  render() {
    const { teamElements } = this.state
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
