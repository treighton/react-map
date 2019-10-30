import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconTextGen from './IconTexGen'

class FarmListItem extends Component {
  render() {
    const {
      title = '',
      content = '',
      acf = {},
      excerpt = '',
      link = '',
      id = null
    } = this.props.farm

    return (
      <div
        onClick={() => this.props.setClickedFarm({ id: id, geometry: [acf.address.lng, acf.address.lat] })}
        className="farm"
        style={{
          display: 'flex',
          width: '100%',
          padding: '20px 0',
        }}
      >
        <div className="image" style={{ flexBasis: '33%' }}>
          <img
            src={acf.gallery && acf.gallery[0].sizes['story-tmb']}
            alt=""
            height="80px"
            width="80px"
          />
        </div>
        <div
          className="description"
          style={{
            flexBasis: '66%',
            borderBottom: '1px solid #979797',
            paddingBottom: '20px',
          }}
        >
          <h2>{title ? title.rendered : ''}</h2>

          <h3>{acf.vet_name}</h3>

          <div
            style={{ display: 'block' }}
          >
            {acf.how_to_buy && acf.how_to_buy.map(item =>
              <IconTextGen key={item.slug} slug={item.slug} name={item.name} />
            )}
          </div>

          <p
            dangerouslySetInnerHTML={{
              __html: content ? excerpt.rendered : '',
            }}
          />

          <a className="button green" href={link} rel="noopener">
            Learn More
          </a>

        </div>
      </div>
    )
  }
}

export default FarmListItem

FarmListItem.propTypes = {
  farm: PropTypes.object,
}
