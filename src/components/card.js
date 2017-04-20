import React from 'react'

export default class Card extends React.Component {
  profileStyle() {
    const shadow = '0px 0px 8px rgba(0,0,0,0.25)'
    return {
      textAlign: 'center',
      marginRight: '10px',
      marginBottom: '10px',
      WebkitBoxShadow: shadow,
      MozBoxShadow: shadow,
      msBoxShadow: shadow,
      boxShadow: shadow,
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
  render() {
    const { title, subtitle, contents, color, textColor } = this.props
    return(
      <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12' style={{padding: 0}}>
        <div style={this.profileStyle()}>

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
