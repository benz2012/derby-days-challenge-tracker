import React from 'react'

export default class Card extends React.Component {
  constructor() {
    super()
    this.state = {
      flash: false,
    }
  }
  profileStyle(flash) {
    const shadow = flash ? '0px 0px 20px 0px rgba(0, 255, 0, 0.7)' : '0px 0px 8px rgba(0,0,0,0.25)'
    const transition = "box-shadow 300ms"
    return {
      textAlign: 'center',
      marginRight: '10px',
      marginBottom: '10px',
      WebkitBoxShadow: shadow,
      MozBoxShadow: shadow,
      msBoxShadow: shadow,
      boxShadow: shadow,
      WebkitTransition: transition,
      MozTransition: transition,
      msTransition: transition,
      transition: transition,
      transitionTimingFunction: 'ease-out',
    }
  }
  baseStyle(color, textColor) {
    return {
      backgroundColor: color,
      color: textColor,
      padding: '10px 5px',
    }
  }
  titleStyle(subtitle) {
    const pad = !subtitle ? '9px 0px' : '0'
    return {
      margin: '0',
      padding: pad,
    }
  }
  statisticStlye() {
    return {
      backgroundColor: 'white',
      padding: '10px 5px',
      textAlign: 'center',
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.contents) {
      if (prevProps.contents.length !== this.props.contents.length) {
        this.setState({flash: true})
        setTimeout(() => {this.setState({flash: false})}, 1000)
      }
    }
  }
  render() {
    const { title, subtitle, contents, color, textColor } = this.props
    return(
      <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12' style={{padding: 0}}>
        <div style={this.profileStyle(this.state.flash)}>

          <div style={this.statisticStlye()}>
            {contents}
          </div>

          <div style={{clear: 'both', paddingTop: '5px'}}>
            <div style={this.baseStyle(color, textColor)}>
              <h4 style={this.titleStyle(subtitle)}>{title}</h4>
              <small>{subtitle}</small>
            </div>
          </div>

        </div>
      </div>
    )
  }
}
