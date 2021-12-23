import React from 'react'
import { LineChart, AreaChart } from 'react-native-svg-charts'

export default function Chart({ data, theme, direction, size }) {
  return (
    <LineChart
      style={size}
      data={data}
      svg={{ stroke: direction === 'up' ? theme.up :  theme.down, strokeWidth: 1 }}
    />
  )
}
