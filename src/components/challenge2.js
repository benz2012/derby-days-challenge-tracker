import React from 'react'

import TeamProfile from './teamProfile'
import { sortOrder } from './sortOrder'

export default class Challenge2 extends React.Component {
  componentDidUpdate() {
    const { data } = this.props
    if (data && Object.keys(data).length !== 0) {
      this.transformData(data)
    }
  }
  transformData(data) {
    const flatData = this.flatten(data, '#5ForTheFight')
    const flatList = []
    Object.keys(flatData).forEach(key => {
      flatList.push(flatData[key])
    })
    flatList.push({
      name: '#5ForTheFight',
      parent: null
    })
    return flatList
  }
  flatten(obj, parent) {
    let flat = {}
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'object') {
        flat[key] = {
          name: key,
          value: null,
          parent: parent
        }
        const f = this.flatten(obj[key], key)
        Object.keys(f).forEach(fkey => {
          flat[`${key}.${fkey}`] = f[fkey]
        })
      } else {
        flat[key] = {
          name: key,
          value: obj[key],
          parent: parent
        }
      }
    })
    return flat
  }
  render() {
    return(
      <div>
        <blockquote>
          <p>Donation of $5 for creating a <a target="_blank" href="https://www.facebook.com/search/top/?q=%235ForTheFight">#5ForTheFight</a> Facebook post</p>
        </blockquote>
        <div>
          blip
        </div>
      </div>
    )
  }
}
