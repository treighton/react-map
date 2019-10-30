import React from 'react'
import ReactDOM from 'react-dom'
import Map from './components/Map'
import FarmList from './components/FarmList'
import SearchBar from './components/searchbar'

/* eslint-disable */
let url = null
if (process.env.NODE_ENV !== 'production') {
  url = `https://fvc2.test/wp-json/wp/v2`
} else {
  url = `https://fvc.staging.wpengine.com/wp-json/wp/v2`
}

/* eslint-enable */
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      farms: [],
      whatWeGrow: [],
      howToBuy: [],
      activeFarms: [],
      clickedFarm: {}
    }
  }

  componentDidMount() {
    this.getData(`${url}/farm`, 'farms', this.resetActiveFarms)
    this.getData(`${url}/what_we_grow`, 'whatWeGrow')
    this.getData(`${url}/how_to_buy`, 'howToBuy')
  }

  getData = (path, stateName, callback = null) => {
    fetch(path)
      .then(response => {
        return response.json()
      })
      .then(result => {
        this.setState({ [stateName]: result }, callback)
      })
  }

  resetActiveFarms = () => {
    this.setState({ activeFarms: this.state.farms })
  }

  setActiveFarms = (newActiveFarms) => {
    this.setState({ activeFarms: newActiveFarms })
  }

  setClickedFarm = (farm) => {
    this.setState({ clickedFarm: farm })
  }

  render() {
    const style = {
      position: 'relative',
      width: '100%',
      height: `700px`,
    }
    return (
      <div style={style}>
        <Map farms={this.state.activeFarms} setClickedFarm={this.setClickedFarm} clickedFarm={this.state.clickedFarm} />

        <SearchBar
          url={url}
          getData={this.getData}
          farms={this.state.farms}
          activeFarms={this.state.activeFarms}
          setActiveFarms={this.setActiveFarms}
          resetActiveFarms={this.resetActiveFarms}
          whatWeGrow={this.state.whatWeGrow}
          howToBuy={this.state.howToBuy}
        />

        <FarmList farms={this.state.activeFarms} setClickedFarm={this.setClickedFarm} clickedFarm={this.state.clickedFarm} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#map-container'))
