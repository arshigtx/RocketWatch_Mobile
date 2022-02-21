import React, { useEffect, useRef, useState } from 'react';
import { PanResponder, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { AreaChart, XAxis, YAxis } from 'react-native-svg-charts';
import { Circle, Defs, G, Line, LinearGradient, Path, Rect, Stop, Text as SvgText } from 'react-native-svg';
import * as shape from 'd3-shape';
import * as Haptics from 'expo-haptics';

export default function InteractiveChart({ data, theme, direction, setCurrentPrice }) {
  
  const apx = (size = 0) => {
    let width = Dimensions.get('window').width;
    return (width / 750) * size;
  };

  const [dateList, setDateList] = useState([
    '08-31 15:09',
    '08-31 15:10',
    '08-31 15:11',
    '08-31 15:12',
    '08-31 15:13',
  ]);

  const size = useRef(data.length);

  const touchHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }

  const [positionX, setPositionX] = useState(-1);// The currently selected X coordinate position

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        updatePosition(evt.nativeEvent.locationX);
        touchHaptic();
        return true;
      },
      onPanResponderMove: (evt, gestureState) => {
        updatePosition(evt.nativeEvent.locationX);
        return true;
      },
      onPanResponderRelease: () => {
        setPositionX(-1);
        touchHaptic();
        setCurrentPrice(null);
      },
    })
  );

  const updatePosition = (x) => {
    const YAxisWidth = apx(130);
    const x0 = apx(0);// x0 position
    const chartWidth = apx(750);
    const xN = x0 + chartWidth;//xN position
    const xDistance = chartWidth / size.current;// The width of each coordinate point
    if (x <= x0) {
      x = x0;
    }
    if (x >= xN) {
      x = xN;
    }

    let value = ((x - x0) / xDistance).toFixed(0);
    if (value >= size.current - 1) {
      value = size.current - 1; // Out of chart range, automatic correction
    }

    setPositionX(Number(value));
    setCurrentPrice(data[Number(value)]);
  };

  const CustomLine = ({ line }) => (
    <Path
      key="line"
      d={line}
      stroke={direction === 'up' ? theme.up :  theme.down}
      strokeWidth={apx(3)}
      fill="none"
    />
  );

  const Tooltip = ({ x, y, ticks }) => {
    if (positionX < 0) {
      return null;
    }

    const date = dateList[positionX];

    return (
      <G x={x(positionX)} key="tooltip">
        {/* <G
            x={positionX > size.current / 2 ? -apx(300 + 10) : apx(10)}
            y={y(priceList[positionX]) - apx(10)}>
            <Rect
                y={-apx(24 + 24 + 20) / 2}
                rx={apx(12)} // borderRadius
                ry={apx(12)} // borderRadius
                width={apx(300)}
                height={apx(96)}
                stroke="rgba(254, 190, 24, 0.27)"
                fill="rgba(255, 255, 255, 0.8)"
            />

            <SvgText x={apx(20)} fill="#617485" opacity={0.65} fontSize={apx(24)}>
                {date}
            </SvgText>
            <SvgText
                x={apx(20)}
                y={apx(24 + 20)}
                fontSize={apx(24)}
                fontWeight="bold"
                fill="rgba(224, 188, 136, 1)">
                ${priceList[positionX]}
            </SvgText>
        </G> */}
        {/* <G>
        <SvgText x={x} y={20} fill="#617485" opacity={0.65} fontSize={apx(24)}>
                {data[positionX]}
            </SvgText>
        </G> */}

        <G x={x}>
            <Line
                y1={ticks[0]}
                y2={ticks[Number(ticks.length)]}
                stroke={'grey'}
                strokeWidth={apx(3)}
            />
        </G>
      </G>
    );
  };

    const verticalContentInset = { top: apx(40), bottom: apx(40) };

    return (
        <View
            style={{
                // backgroundColor: '#fff',
                // alignItems: 'stretch',
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    width: apx(750),
                    height: apx(500),
                    alignSelf: 'stretch',
                }}>
                <View style={{ flex: 1, height: apx(500) }} {...panResponder.current.panHandlers}>
                    <AreaChart
                        style={{ flex: 1, }}
                        data={data}
                        // curve={shape.curveNatural}
                        curve={shape.curveMonotoneX}
                        contentInset={{ ...verticalContentInset }}
                        // svg={{ fill: 'url(#gradient)' }}
                        >
                        <CustomLine />
                        {/* <CustomGrid /> */}
                        {/* <CustomGradient /> */}
                        <Tooltip />
                    </AreaChart>
                </View>
            </View>
        </View>
    );
}