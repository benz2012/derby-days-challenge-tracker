import React from 'react'

import TeamProfile from './teamProfile'

export default class Challenge0 extends React.Component {
  mapTeams(teamObjs) {
    const teamElements = []
    Object.keys(teamObjs).forEach(teamKey => {
      const team = teamObjs[teamKey]
      const teamEl = <TeamProfile key={team.Team} name={team.Team}
        number={0} chapter={team.Chapter} raised={team.Raised} />
      teamElements.push(teamEl)
    })
    return teamElements
  }
  render() {
    const teamElements = this.mapTeams(this.props.data)
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
