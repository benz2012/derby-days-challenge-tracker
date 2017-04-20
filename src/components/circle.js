import React from 'react'

export default class Circle extends React.Component {
  constructor() {
    super()
    this.state = {
      hover: false,
    }
  }
  initials(name) {
    const f = name.charAt(0)
    const names = name.split(' ')
    const l = names[names.length-1].charAt(0)
    return (f + l).toUpperCase()
  }
  circleStyle() {
    return {
      position: 'relative',
      display: 'inline-block',
      borderRadius: '50%',
      width: '28px',
      height: '28px',
      backgroundColor: this.props.color,
      color: 'white',
      textAlign: 'center',
      paddingTop: '3px',
      float: 'left',
      margin: '0 0 3px 3px'
    }
  }
  hoverStyle() {
    return {
      position: 'absolute',
      zIndex: 2,
      backgroundColor: 'black',
      color: 'white',
      visibility: this.state.hover ? 'visible' : 'hidden',
      width: '140px',
      textAlign: 'center',
      padding: '3px 6px',
      left: '50%',
      top: '35px',
      marginLeft: '-70px',
    }
  }
  hoverTriangle() {
    return {
      visibility: this.state.hover ? 'visible' : 'hidden',
      content: '',
      zIndex: 1,
      position: 'absolute',
      bottom: '-7px',
      left: '50%',
      marginLeft: '-6px',
      width: '0',
      height: '0',
      borderBottom: '6px solid #000000',
      borderRight: '6px solid transparent',
      borderLeft: '6px solid transparent',
    }
  }
  mouseOver() {
    this.setState({hover: true})
  }
  mouseLeave() {
    this.setState({hover: false})
  }
  render() {
    const { children } = this.props
    const initials = this.initials(children)
    return(
      <div>

        <div style={this.circleStyle()} onMouseEnter={this.mouseOver.bind(this)}
          onMouseLeave={this.mouseLeave.bind(this)}>
          {initials}
          <div style={this.hoverStyle()}>
            {children}
          </div>
          <span style={this.hoverTriangle()} />
        </div>
      </div>
    )
  }
}
