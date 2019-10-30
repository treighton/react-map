import React from 'react'

class Marker extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const markerStyle = {
      display: 'block',
      border: 'none',
      borderRadius: '50%',
      cursor: 'pointer',
      padding: 0,
    }
    return <div className="marker" style={markerStyle} />
  }
}

export default Marker
