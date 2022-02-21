import React, { useEffect, useState } from 'react'
import { LineChart, AreaChart } from 'react-native-svg-charts'
import { useSelector } from 'react-redux'

import { getChartData } from '../../api/cryptoDataApi';

export default function CardChart({ slug, theme, direction }) {

  const { currency } = useSelector(state => state.userPreference)
  const [ chartData, setChartData ] = useState(null);

  useEffect(() => {
    if(!chartData) {
      getChartData({slugs: [slug], range: '2d', currency})
        .then(result => setChartData(result[0].chartData))
        .catch(err => console.log(err))
    }
  },[])

  return (
    chartData ?
      <LineChart
        style={{ height: 40, width: 158 }}
        data={chartData.price}
        svg={{ stroke: direction === 'up' ? theme.up :  theme.down, strokeWidth: 1 }}
      />
    : null
  )
}
