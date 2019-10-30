import React, { Component } from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import styles from './helpers/comStyles'
import IconTextGen from './IconTexGen'

class Filter extends React.PureComponent {

  handleFilter = (id) => {
    return () => {
      var filters = this.props.activeFilters.slice();
      var index = filters.indexOf(id);
      if (index === -1) {
        filters.push(id);
      } else {
        filters.splice(index, 1);
      }
      this.props.setActiveFilters(this.props.filterName, filters)
    }
  }

  render() {
    const { classes, initialFilters, activeFilters, label, icon = false } = this.props
    return (
      <div>
        <h3>{label}</ h3>
        <ul className={classes.dropdownList}>
          {initialFilters && initialFilters.map(item => (
            <li
              key={item.id}
              style={activeFilters.indexOf(item.id) !== -1 ? { background: '#863b37', color: '#fff' } : null}
              onClick={this.handleFilter(item.id)}
            >{icon ? <IconTextGen slug={item.slug} name={item.name} /> : <span>{item.name}</span>}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default injectSheet(styles)(Filter)

Filter.propTypes = {
  filterName: PropTypes.string,
  filters: PropTypes.array,
  activeFilters: PropTypes.array,
  setActiveFilters: PropTypes.func
}
