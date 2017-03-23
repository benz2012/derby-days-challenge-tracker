import React from 'react'

import ChallengeChild from './challengeChild'

export default class Api extends React.Component {
  render() {
    const { number, data } = this.props
    return(
      <div>
        <div>
          <ChallengeChild
            number={number}
            data={data}
          />
        </div>
      </div>
    )
  }
}
