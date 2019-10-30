import React from 'react'
import injectSheet from 'react-jss'
import styles from './helpers/comStyles'

const distances = [
  10,
  25,
  50,
  100,
  150,
  500
]

class DistanceSelect extends React.PureComponent {
  state = {
    showDropdown: false,
  }

  handleDistanceSelect = (d) => {
    return () => {
      this.props.setDistance(d)
      this.toggleDistDrop()
    }
  }
  toggleDistDrop = () => {
    this.setState({ showDropdown: !this.state.showDropdown })
  }
  render() {
    const { classes } = this.props

    var dList = <div className={classes.dropdownListContainer}>
      <ul className={classes.dropdownList}>
        {distances.map((dist, i) => {
          return (
            <li key={dist} onClick={this.handleDistanceSelect(dist)}>
              <span>
                {`${dist} mi.`}
              </span>
            </li>)
        })
        }
      </ul>
    </div>

    return (
      <div style={{ marginLeft: 15 }}>
        <div onClick={this.toggleDistDrop} className={classes.dropdownToggle}>
          {`${this.props.distance} mi.`}
        </div>
        {this.state.showDropdown && dList}
      </div>
    )
  }
}

export default injectSheet(styles)(DistanceSelect)