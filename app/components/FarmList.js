import React from 'react'
import PropTypes from 'prop-types'
import FarmListItem from './FarmListItem'

class FarmList extends React.Component {
  render() {
    const style = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      width: '30%',
      padding: '40px',
      height: '100%',
      overflowY: 'scroll',
    }
    const { farms = [], setClickedFarm } = this.props
    return (
      <div style={style}>
        {farms.map((farm, i) => (
          <FarmListItem key={i} farm={farm} setClickedFarm={setClickedFarm} />
        ))}
      </div>
    )
  }
}

export default FarmList

FarmList.propTypes = {
  farms: PropTypes.array,
}
