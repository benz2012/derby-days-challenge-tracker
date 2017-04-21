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
      } else if (type.substring(0,6) === 'POSTED') {
        const affil = type.substring(6, type.length)
        if (affil) {
          sorted.p.push(name + affil)
        } else {
          sorted.p.push(name)
        }
      }
    })
    return sorted
  }
  formatData(data) {
    let formatted = {}
    Object.keys(data).forEach(key => {
      const list = data[key]
      let circles = list.map(name => {
        let dispName = name
        let dispColor = this.colors(key)
        const affil = name.substring(name.length-4, name.length)
        if (affil.charAt(0) === '_') {
          dispName = name.substring(0, name.length-4)
          dispColor = this.teamColors(affil.substring(1,affil.length))
        }
        return <Circle key={name} color={dispColor}>{dispName}</Circle>
      })
      if (circles.length > 50) {
        const remainder = circles.length - 50
        const rString = '+' + remainder + ' Others'
        circles = circles.slice(0, 50)
        circles.push(
          <Circle key={rString} color={this.colors(key)}>{rString}</Circle>
        )
      }
      formatted[key] = circles
    })
    return formatted
  }
  teamColors(team) {
    const colors = {
      'AXD': 'rgb(28, 61, 128)',
      'ASA': '#DC143C',
      'SSS': 'rgb(114,71,156)',
      'ZTA': '#40E0D0',
      'DPE': 'rgb(255,214,74)',
    }
    return colors[team]
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
