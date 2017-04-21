import React from 'react'

import TeamProfile from './teamProfile'
import Card from './card'
import Circle from './circle'

export default class Challenge2 extends React.Component {
  sortData(data) {
    const sorted = {b: [], bp: [], np: [], p: []}
    Object.keys(data).forEach(name => {
      const type = data[name]
      if (type === 'BROTHER') {
        sorted.b.push(name)
      } else if (type === 'BROTHER_POSTED') {
        sorted.bp.push(name)
      } else if (type === 'NOT_POSTED') {
        sorted.np.push(name)
      } else if (type === 'POSTED') {
        sorted.p.push(name)
      }
    })
    return sorted
  }
  formatData(data) {
    let formatted = {}
    Object.keys(data).forEach(key => {
      const list = data[key]
      const circles = list.map(name => {
        return <Circle key={name} color={this.colors(key)}>{name}</Circle>
      })
      formatted[key] = circles
    })
    return formatted
  }
  colors(key) {
    const c = {
      p: 'rgb(99, 206, 70)',
      np: 'rgb(244, 167, 66)',
      bp: 'rgb(0, 157, 220)',
      b: 'rgb(200, 200, 200)',
    }
    return c[key]
  }
  render() {
    const { data } = this.props
    const sorted = data && Object.keys(data).length !== 0 ?
      this.sortData(data) : []
    const formatted = this.formatData(sorted)
    const blip = 270
    const accrued = formatted.p ? Math.min(formatted.p.length*5, 250) : 0 // max of $250 for this challenge
    return(
      <div>
        <blockquote>
          <p>Donation of $5 for creating a <a target="_blank" href="https://www.facebook.com/search/top/?q=%235ForTheFight">#5ForTheFight</a> Facebook post.</p>
          <p>Total Accrued:&nbsp;
            <span className="text-success">
              ${accrued}
            </span> out of $250
          </p>
        </blockquote>
        <div>
          <Card title='Posted'
            contents={formatted.p} color={this.colors('p')}/>
          <Card title='Tagged' subtitle='but not yet posted'
            contents={formatted.np} color={this.colors('np')} />
          <Card title='Brothers Posted' subtitle='no donation for these'
            contents={formatted.bp} color={this.colors('bp')} textColor='white' />
          <Card title='Brothers Tagged' subtitle='but not yet posted'
            contents={formatted.b} color={this.colors('b')} />
        </div>
      </div>
    )
  }
}
