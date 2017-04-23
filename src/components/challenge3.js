import React from 'react'
import Chart from 'chart.js'

import Card from './card'

export default class Challenge2 extends React.Component {
  constructor() {
    super()
    this.state = {
      graphs: [],
      cards: [],
    }
  }
  mapData(data) {
    let all = []
    data.forEach((item) => {
      if (!item) { return }
      const { available, given, solved } = item
      const a = available - given, g = given - solved, s = solved
      let graphData = {
        labels: [`Available (${a})`, `Unsolved (${g})`, `Solved (${s})`],
        datasets: [{
          data: [a, g, s],
          backgroundColor: ['#36A2EB', 'rgb(200,200,200)', 'rgb(99,206,70)']
        }]
      }
      all.push(graphData)
    })
    return all
  }
  buildGraphs() {
    const { graphs } = this.state
    if (graphs.length > 0) {
      graphs.forEach(graph => {
        graph.destroy()
      })
    }
    const { data } = this.props
    if (!data) { return }
    const mapped = this.mapData(data)
    mapped.forEach((item, index) => {
      const graphContext = document.getElementById(`doughnut-${index+1}`)
      const doughnut = new Chart(graphContext, {
        type: 'doughnut',
        data: item,
        options: {
          animation: { animateRotate: false },
          cutoutPercentage: 45
        }
      })
      this.setState({graphs: [...this.state.graphs, doughnut]})
    })
  }
  drawCards() {
    let cards = []
    for (let i = 1; i < 5; i++) {
      const price = this.props.data ? this.props.data[i].price : ''
      const canvas = <canvas id={`doughnut-${i}`} height='200'
        style={this.chartStyle()} />
      const card = <Card key={`Round ${i}`} title={`Round ${i}`}
        subtitle={`$${price} per solve`} contents={canvas}
        color='black' textColor='white' />
        cards.push(card)
    }
    this.setState({cards: cards})
  }
  componentWillMount() {
    this.drawCards()
  }
  componentDidMount() {
    let allCardsExist = true
    Array([1,2,3,4]).forEach(index => {
      const ctx = document.getElementById(`doughnut-${index}`)
      if (ctx) {
        allCardsExist = false
      }
    })
    if (allCardsExist) {
      this.buildGraphs()
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.data === undefined && this.props.data &&
    this.props.data.length > 0) {
      this.drawCards()
      this.buildGraphs()
    }
    if (!this.props.data || !prevProps.data) { return }
    let changed = false
    for (let i = 0; i < prevProps.data.length; i++) {
      Object.keys(prevProps.data[i]).forEach(key => {
        const next = prevProps.data[i][key]
        const prev = this.props.data[i][key]
        if (next !== prev) {
          changed = true
        }
      })
    }
    if (changed) {
      this.buildGraphs()
    }
    if (prevProps.visible === 'show ▼' && this.props.visible === 'hide ▲') {
      console.log('show')
      this.drawCards()
      this.buildGraphs()
    }
  }
  chartStyle() {
    return {
      marginBottom: '0px',
    }
  }
  render() {
    let accrued = 0
    if (this.props.data) {
      this.props.data.forEach(item => {
        if (!item) { return }
        accrued += item.solved * item.price
      })
    }
    return(
      <div>
        <blockquote>
          <p>A Brothers only scavenger hunt: solve clues, raise money.</p>
          <p>Total Accrued:&nbsp;
            <span className="text-success">
              ${accrued}
            </span> out of $400
          </p>
        </blockquote>
        <div>
          {this.state.cards}
        </div>
      </div>
    )
  }
}
