import React from 'react'

import Challenge0 from './challenge0'
import Challenge1 from './challenge1'

export default class ChallengeChild extends React.Component {
  pickChild() {
    const { number, data } = this.props
    const challenges = {
      0: <Challenge0 data={data} />,
      1: <Challenge1 data={data} />
    }
    return number in challenges ? challenges[number] : null
  }
  render() {
    const child = this.pickChild()
    return(
      <div>{child}</div>
    )
  }
}
