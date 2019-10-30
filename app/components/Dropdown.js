import React from 'react'
import injectSheet from 'react-jss'
import styles from './helpers/comStyles'

class FilterDropdown extends React.PureComponent {
  state = {
    shown: false,
  }

  toggleSaleFilter = () => {
    this.setState({ shown: !this.state.shown })
  }

  createMarkup = () => {
    const { label } = this.props
    return { __html: `${label}` }
  }

  render() {
    const { classes, children } = this.props
    return (
      <div style={{ marginLeft: 15 }}>
        <div
          dangerouslySetInnerHTML={this.createMarkup()}
          className={classes.dropdownToggle}
          onClick={this.toggleSaleFilter}
        />
        <div style={this.state.shown ? { display: 'block' } : { display: 'none' }} className={classes.dropdownListContainer}>
          {children}
        </div>
      </div>
    )
  }
}

export default injectSheet(styles)(FilterDropdown)