import mapboxgl from 'mapbox-gl'
import React from 'react'
import PropTypes from 'prop-types'

mapboxgl.accessToken =
  'pk.eyJ1IjoidHJlaWdodG9uIiwiYSI6ImNpb25rMDVhZTAwMDV2OWt2ZW5rbDF4aGcifQ.pqTlbSrFnCJkkRGd6E4twA'

class Map extends React.Component {

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/treighton/cjo99huzg05y22rpfsvm52qoa',
      center: [-97.363965, 40.5451264],
      zoom: 3, // starting zoom
    })
    this.map.scrollZoom.disable()
    if (this.props.farms) {
      var geoJson = this.convertFarmstoGeoJson(this.props.farms);
      this.renderMarkers(geoJson, this.map)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.farms && this.props.farms != prevProps.farms) {
      if (this.markers) {
        this.markers.map(marker => marker.remove())
      };
      var geoJson = this.convertFarmstoGeoJson(this.props.farms);
      this.renderMarkers(geoJson, this.map)
    }
    if (this.props.clickedFarm.hasOwnProperty('geometry')) {
      this.map.flyTo({ center: this.props.clickedFarm.geometry })
    } else {
      this.map.flyTo({ center: [-97.363965, 40.5451264] })
    }
  }

  componentWillUnmount() {
    this.map.remove()
  }

  convertFarmstoGeoJson = points => {
    const geo = points.map(point => {
      const lat = parseFloat(point.acf.address.lat) || 38.913
      const lng = parseFloat(point.acf.address.lng) || -77.032
      return {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [lng, lat] },
        properties: {
          title: point.title.rendered,
          description: point.acf.address.address,
          image: point.acf.gallery[0].sizes.thumbnail,
          link: point.link,
          id: point.id
        },
      }
    })
    return {
      type: 'FeatureCollection',
      features: [...geo],
    }
  }

  createMap = () => {
    this.setState({ map: this.map })
  }

  renderMarkers = (points, map) => {
    if (!points.features) {
      return
    }

    this.markers = [];
    const { setClickedFarm } = this.props
    points.features.forEach(point => {
      var popup = new mapboxgl.Popup({
        offset: 30,
      }).setHTML(`<div className="marker" style="width:350px;">
        <div className="marker-content" style="display:flex">
        <div className="image" style="flex-basis: 25%; margin-right: 10px">
          <img src="${point.properties.image}" alt=""/>
        </div>
        <div className="desc" style="flex-basis: 75%">
        <h2><a href="${point.properties.link}">${
        point.properties.title
        }</a></h2>
        <p>${point.properties.description}</p>
        </div>
        </div>
        </div>`).on('open', () => setClickedFarm({ id: point.properties.id, geometry: point.geometry.coordinates }))
      var marker = new mapboxgl.Marker()
        .setLngLat(point.geometry.coordinates)
        .setPopup(popup)

      this.markers.push(marker);
    })

    this.markers.map(marker => marker.addTo(map));
  }

  render() {
    const style = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: '70%',
    }
    return <div style={style} ref={el => (this.mapContainer = el)} />
  }
}

export default Map

Map.propTypes = {
  farms: PropTypes.array,
}
