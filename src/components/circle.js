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
    if (f === '+') { return name.split(' ')[0] }
    const names = name.split(' ')
    const l = names[names.length-1].charAt(0)
    return (f + l).toUpperCase()
  }
  circleStyle(initials) {
    let shadow = ''
    let backgroundColor = this.props.color
    let color = 'white'
    if (initials.charAt(0) === '+') {
      shadow = 'inset 0px 0px 0px 2px ' + this.props.color
      backgroundColor = 'none'
      color = this.props.color
    }
    if (this.props.color === '#40E0D0' || this.props.color === 'rgb(255,214,74)') {
      color = 'rgb(51,51,51)'
    }
    return {
      position: 'relative',
      display: 'inline-block',
      WebkitBoxShadow: shadow,
      MozBoxShadow: shadow,
      msBoxShadow: shadow,
      boxShadow: shadow,
      borderRadius: '50%',
      width: '28px',
      height: '28px',
      backgroundColor: backgroundColor,
      color: color,
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

        <div style={this.circleStyle(initials)} onMouseEnter={this.mouseOver.bind(this)}
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
