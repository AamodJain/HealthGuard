import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import ReactTooltip from 'react-tooltip';

import INDIA_TOPO_JSON from './india.topo.json';
import LinearGradient from './LinearGradient.jsx';

const PROJECTION_CONFIG = {
  scale: 350,
  center: [78.9629, 22.5937]
};

const codes = {
    "Andhra Pradesh": "AP",
    "Arunanchal Pradesh": "AR",
    "Assam": "AS",
    "Bihar": "BR",
    "Chhattisgarh": "CG",
    "Goa": "GA",
    "Gujarat": "GJ",
    "Haryana": "HR",
    "Himachal Pradesh": "HP",
    "Jammu & Kashmir": "JK",
    "Jharkhand": "JH",
    "Karnataka": "KA",
    "Kerala": "KL",
    "Madhya Pradesh": "MP",
    "Maharashtra": "MH",
    "Manipur": "MN",
    "Meghalaya": "ML",
    "Mizoram": "MZ",
    "Nagaland": "NL",
    "Odisha": "OR",
    "Punjab": "PB",
    "Rajasthan": "RJ",
    "Sikkim": "SK",
    "Tamil Nadu": "TN",
    "Tripura": "TR",
    "Uttarakhand": "UK",
    "Uttar Pradesh": "UP",
    "West Bengal": "WB",
    "Andaman & Nicobar Island": "AN",
    "Chandigarh": "CH",
    "Dadara & Nagar Havelli": "DH",
    "Daman & Diu": "DD",
    "Delhi": "DL",
    "Lakshadweep": "LD",
    "Puducherry": "PY",
    "Telangana": "TG",
}

const COLOR_RANGE = [
  '#f5b2f1',
  '#e3a9f3',
  '#d2a0f6',
  '#cbaaf4',
  '#b08fe2',
  '#9873d2',
  '#7d5fc4',
  '#6b49b3',
  '#582fa3'
];

const DEFAULT_COLOR = '#EEE';

const geographyStyle = {
  default: { outline: 'none' },
  hover: { fill: '#ccc', transition: 'all 250ms', outline: 'none' },
  pressed: { outline: 'none' }
};

function MapChart({ data }) {
  console.log(' data:', data);
  const stateDataMap = {};

  data.forEach(({ state, disease, active_cases }) => {
    if (!stateDataMap[state] || active_cases > stateDataMap[state].activeCases) {
      stateDataMap[state] = { disease, active_cases };
    }
  });

  console.log('stateDataMap:', stateDataMap);

  const activeCasesArray = Object.values(stateDataMap).map(d => d.active_cases);
  console.log('activeCasesArray:', activeCasesArray);
  const colorScale = scaleQuantile()
    .domain(activeCasesArray.length ? activeCasesArray : [0])
    .range(COLOR_RANGE);

  const gradientData = {
    fromColor: COLOR_RANGE[0],
    toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
    min: Math.min(...activeCasesArray),
    max: Math.max(...activeCasesArray)
  };

  return (
    <div className="container">
      <ReactTooltip
  id="map-tooltip"
  anchorSelect="[data-tooltip-id='map-tooltip']"
  place="top"
  effect="solid"
  style={{ backgroundColor: "#333", color: "#fff", fontSize: "0.75rem" }}
/>


      <ComposableMap
        projectionConfig={PROJECTION_CONFIG}
        projection="geoMercator"
        width={600}
        height={220}
      >
        <Geographies geography={INDIA_TOPO_JSON}>
          {({ geographies }) =>
            geographies.map(geo => {
  const stateName = geo.properties.name;
  const stateCode = codes[stateName];  // Get state code like "KA"
  if(!stateName){
    return;
  }


  if (!stateCode) {
    console.warn(`State code not found for "${stateName}"`);
  }

  const current = stateCode ? stateDataMap[stateCode] : null;

  return (
    <Geography
      key={geo.rsmKey}
      geography={geo}
      fill={current ? colorScale(current.active_cases) : DEFAULT_COLOR}
      style={geographyStyle}
      data-tooltip-id="map-tooltip"
      data-tooltip-html={
        current
          ? `<strong>${stateName}</strong><br/>
             Disease: ${current.disease}<br/>
             Active Cases: ${current.active_cases}`
          : `<strong>${stateName}</strong><br/>No data`
      }
    />
  );
})

          }
        </Geographies>
      </ComposableMap>

      {/* Gradient Scale */}
      <LinearGradient data={gradientData} />
    </div>
  );
}

export default MapChart;
