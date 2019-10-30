import React from 'react'

import agriTour from '../assets/agri_tourism_icon_1.svg'
import certifiedOrganic from '../assets/certified_organic_icon_1.svg'
import csa from '../assets/csa_icon_1.svg'
import onFarm from '../assets/on_farm_sale_icon_1.svg'
import retail from '../assets/retail_icon_1.svg'
import wholesale from '../assets/wholesales_icon_1.svg'
import farmersMarket from '../assets/farmers_market_icon_1.svg'
import internet from '../assets/internet_icon_1.svg'

class IconTextGen extends React.PureComponent {
  icons = {
    'csa': csa,
    'on-farm-sales': onFarm,
    'retail-sales': retail,
    'internet-sales': internet,
    'wholesale': wholesale,
    'farmers-market': farmersMarket,
    'certified-organic': certifiedOrganic,
    'agri-tourism': agriTour,
  }

  genIconHTML = (slug, name) => {
    const { size = 40 } = this.props
    return { __html: `<div style="width: ${size}px; height: ${size}px;">${this.icons[slug]}</div><div style="margin-left:0.5rem">${name}</div>` }
  }

  render() {
    const { slug, name } = this.props
    return (
      <div
        dangerouslySetInnerHTML={this.genIconHTML(slug, name)}
        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', }}
      />
    )
  }
}

export default IconTextGen