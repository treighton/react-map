import React, { Component } from 'react'
import Filter from './Filter'
import mapboxgl from 'mapbox-gl'
import PropTypes from 'prop-types'
import Geocoder from './Geocoder'
import DistanceSelect from './DistanceSelect'
import Dropdown from './Dropdown'
import injectSheet from 'react-jss'
import styles from './helpers/comStyles'
import filterIcon from '../assets/filter-outline.svg'

import filterArrayByField from './helpers/filterArray'

mapboxgl.accessToken = 'pk.eyJ1IjoidHJlaWdodG9uIiwiYSI6ImNpb25rMDVhZTAwMDV2OWt2ZW5rbDF4aGcifQ.pqTlbSrFnCJkkRGd6E4twA'

class SearchBar extends Component {
  state = {
    distance: 25,
    whatWeGrow: [],
    howToBuy: [],
    value: {}
  }

  selectFarmsByLocation = () => {
    const { distance, value } = this.state
    const { url, getData, resetActiveFarms } = this.props
    const urlParams = `${url}/farms/search/?lat=${value.center[1]}&lng=${value.center[0]}&d=${distance}`
    getData(urlParams, 'farms', () => { resetActiveFarms(), this.filterFarms() })
  }

  setDistance = (d) => {
    this.state.value.center ?
      this.setState({ distance: d }, this.selectFarmsByLocation) :
      this.setState({ distance: d })
  }

  setValue = (v) => {
    this.setState({ value: v }, this.selectFarmsByLocation)
  }

  setActiveFilters = (name, value) => {
    this.setState({ [name]: value }, this.filterFarms)
  }
  // this is intense
  filterFarms = () => {
    const { whatWeGrow, howToBuy } = this.state;
    const { resetActiveFarms, farms, setActiveFarms } = this.props;
    // if filters are empty we resetting active farms to farms
    if (whatWeGrow.length === 0 && howToBuy.length === 0) {
      resetActiveFarms()
    } else {
      var activeFarms = null;
      if (whatWeGrow.length > 0 && howToBuy.length === 0) {
        activeFarms = filterArrayByField(farms, whatWeGrow, 'what_we_grow')
      } else {
        if (howToBuy.length > 0 && whatWeGrow.length === 0) {
          activeFarms = filterArrayByField(farms, howToBuy, 'how_to_buy')
        } else {
          activeFarms = filterArrayByField(farms, whatWeGrow, 'what_we_grow')
          activeFarms = filterArrayByField(activeFarms, howToBuy, 'how_to_buy')
        }
      }
      setActiveFarms(activeFarms)
    }
  }
  // this is for future reset button
  clearFilters = () => {
    const { getData, url, resetActiveFarms } = this.props
    this.setState({
      distance: 25,
      howToBuy: [],
      whatWeGrow: [],
      value: {}
    }, () => getData(`${url}/farm`, 'farms', resetActiveFarms))
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.searchBar}>
        <Geocoder accessToken={mapboxgl.accessToken} onSelect={this.setValue} inputPlaceholder='Search by location' />

        <DistanceSelect setDistance={this.setDistance} distance={this.state.distance} />

        <Dropdown label={filterIcon}>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
            <Filter
              label='Products'
              initialFilters={this.props.whatWeGrow}
              activeFilters={this.state.whatWeGrow}
              setActiveFilters={this.setActiveFilters}
              filterName="whatWeGrow"
            />
            <div className={classes.verticalBreak}></div>
            <Filter
              icon={true}
              label='How to buy'
              initialFilters={this.props.howToBuy}
              activeFilters={this.state.howToBuy}
              setActiveFilters={this.setActiveFilters}
              filterName="howToBuy"
            />
          </div>
          <button style={{ margin: 0, width: '100%' }} onClick={this.clearFilters} >Clear Filters</button>

        </Dropdown>

      </div>
    )
  }
}

export default injectSheet(styles)(SearchBar)

SearchBar.propTypes = {
  filters: PropTypes.array,
  activeFilters: PropTypes.array,
}
