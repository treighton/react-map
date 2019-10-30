import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import search from './helpers/search'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import styles from './helpers/comStyles'

class Geocoder extends Component {
  state = {
    results: [],
    focus: null,
    loading: false,
    searchTime: new Date(),
    searchVal: '',
    show: false
  }

  static defaultProps = {
    endpoint: 'https://api.tiles.mapbox.com',
    inputClass: '',
    resultClass: '',
    resultsClass: '',
    resultFocusClass: 'strong',
    inputPosition: 'top',
    inputPlaceholder: 'Search',
    showLoader: false,
    source: 'mapbox.places',
    proximity: '',
    bbox: '',
    types: '',
    onSuggest: function () { },
    focusOnMount: true,
  }

  componentDidMount() {
    if (this.props.focusOnMount) ReactDOM.findDOMNode(this.refs.input).focus()
  }

  onInput = e => {
    this.setState({ loading: true })
    const value = e.target.value
    if (value === '') {
      this.setState({
        results: [],
        focus: null,
        loading: false,
      })
    } else {
      search(
        this.props.endpoint,
        this.props.source,
        this.props.accessToken,
        this.props.proximity,
        this.props.bbox,
        this.props.types,
        value,
        this.onResult,
      )
    }
    this.setState({ searchVal: value })
  }
  moveFocus = dir => {
    if (this.state.loading) return
    this.setState({
      focus:
        this.state.focus === null
          ? 0
          : Math.max(
            0,
            Math.min(this.state.results.length - 1, this.state.focus + dir),
          ),
    })
  }
  acceptFocus = () => {
    if (this.state.focus !== null) {
      this.props.onSelect(this.state.results[this.state.focus])
    }
  }

  toggleDistDrop = () => {
    this.setState({ showDropdown: !this.state.showDropdown })
  }

  onResult = (err, res, body, searchTime) => {
    //searchTime is compared with the last search to set the state
    //to ensure that a slow xhr response does not scramble the
    //sequence of autocomplete display.
    if (!err && body && body.features && this.state.searchTime <= searchTime) {
      this.setState({
        searchTime: searchTime,
        loading: false,
        results: body.features,
        focus: [],
      })
      this.props.onSuggest(this.state.results)
    }
  }

  clickOption = (place, listLocation) => {
    this.props.onSelect(place)
    this.setState({ focus: listLocation })
    this.setState({ searchVal: place.place_name })
    this.hideDropdown()
    return false
  }

  showDropdown = () => {
    this.setState({ show: true })
  }
  hideDropdown = () => {
    this.setState({ show: false })
  }

  render() {
    const { classes } = this.props

    var input = (
      <input
        ref="input"
        onFocus={this.showDropdown}
        onChange={this.onInput}
        placeholder={this.props.inputPlaceholder}
        type="text"
        className={classes.searchInput}
        value={this.state.searchVal}
      />
    )

    return (
      <div>
        {this.props.inputPosition === 'top' && input}

        {(this.state.show && this.state.results.length > 0) && (
          <div className={classes.dropdownListContainer}>
            <ul
              className={`${
                this.props.showLoader && this.state.loading ? 'loading' : ''
                } ${this.props.resultsClass} ${classes.dropdownList}`}
            >
              {this.state.results.map((result, i) => (
                <li key={result.id}>
                  <a
                    onClick={this.clickOption.bind(this, result, i)}
                    className={
                      this.props.resultClass +
                      ' ' +
                      (i === this.state.focus ? this.props.resultFocusClass : '')
                    }
                    key={result.id}
                  >
                    {result.place_name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        {this.props.inputPosition === 'bottom' && input}
      </div>
    )
  }
}

export default injectSheet(styles)(Geocoder)

Geocoder.prototypes = {
  endpoint: PropTypes.string,
  source: PropTypes.string,
  inputClass: PropTypes.string,
  resultClass: PropTypes.string,
  resultsClass: PropTypes.string,
  inputPosition: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  resultFocusClass: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onSuggest: PropTypes.func,
  accessToken: PropTypes.string.isRequired,
  proximity: PropTypes.string,
  bbox: PropTypes.string,
  showLoader: PropTypes.bool,
  focusOnMount: PropTypes.bool,
  types: PropTypes.string,
}
