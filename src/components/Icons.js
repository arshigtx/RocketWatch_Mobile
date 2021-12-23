import React from 'react';
import { Dimensions, View } from 'react-native';
import Svg, {Defs, Path, G, Circle, Rect } from "react-native-svg"
import {height, width} from '../constants/size';

export function HomeIcon({color, size}) {
  return (
    <Svg width="25px" height="24px" viewBox="0 0 25 24" version="1.1" xmlns="http://www.w3.org/2000/Svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <G id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
          <G id="Mobile"  stroke={color} strokeWidth="1.5">
              <G id="Home2-Linear-32px" transform="translate(-37.000000, -36.000000)">
              <Path  d="M46.151,37.9060849 L39.8926111,42.5324266 C38.8476111,43.3034835 38,44.9447333 38,46.1894395 L38,54.3516281 C38,56.9071311 40.1945,59 42.8882778,59 L56.3339444,59 C59.0277222,59 61.2222222,56.9071311 61.2222222,54.3626432 L61.2222222,46.3436509 C61.2222222,45.0108239 60.2817222,43.3034835 59.1322222,42.5434417 L51.9565556,37.7739037 C50.331,36.694424 47.7185,36.7494995 46.151,37.9060849 Z M49.6111111,54.5939603 L49.6111111,51.2894305" id="Shape"></Path>
              </G>
          </G>
      </G>
    </Svg>
  ) 
}

export function ExploreIcon({color, size}) {
  return (
    <Svg width="25px" height="24px" viewBox="0 0 25 24"  version="1.1" xmlns="http://www.w3.org/2000/Svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <G id="Page-1" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd" strokeLinecap="round" strokeLinejoin="round">
          <G id="Mobile" transform="translate(-85.000000, -35.000000)" stroke={color} strokeWidth="1.5">
              <G id="GlobalSearch-Linear-32px" transform="translate(86.000000, 36.000000)">
                <Path d="M23.2222222,11 C23.2222222,4.928 18.0204444,0 11.6111111,0 C5.20177778,0 0,4.928 0,11 C0,17.072 5.20177778,22 11.6111111,22" id="Path"></Path>
                <Path d="M6.61791972,1.22222222 L7.71377896,1.22222222 C5.5768885,7.1719671 5.5768885,13.6058107 7.71377896,19.5555556 L6.61791972,19.5555556 M14.2889344,1.22222222 C15.3519179,4.1962963 15.8888889,7.29259259 15.8888889,10.3888889" id="Shape"></Path>
                <Path d="M1.22222222,15.4082288 L1.22222222,14.3096002 C4.60327485,15.3752699 8.12327485,15.9135979 11.6432749,15.9135979 M1.22222222,7.71782899 C7.98614272,5.57553848 15.300407,5.57553848 22.0643275,7.71782899 M18.8222222,21.3408229 C20.8685826,21.3408229 22.5274854,19.7668301 22.5274854,17.8252116 C22.5274854,15.883593 20.8685826,14.3096002 18.8222222,14.3096002 C16.7758619,14.3096002 15.1169591,15.883593 15.1169591,17.8252116 C15.1169591,19.7668301 16.7758619,21.3408229 18.8222222,21.3408229 L18.8222222,21.3408229 Z M23.2222222,22 L22.0643275,20.9013715" id="Shape"></Path>
              </G>
          </G>
      </G>
    </Svg>
  )
}


export function WatchlistIcon({color, size}) {
  return(
    <Svg width="30px" height="22px" viewBox="0 0 30 22" version="1.1" xmlns="http://www.w3.org/2000/Svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <G id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" strokeLinecap="round">
          <G id="Artboard" transform="translate(-121.000000, -35.000000)" stroke={color} strokeWidth="1.5">
              <G id="Group" transform="translate(122.000000, 35.000000)">
                  <G id="HambergerMenu-Linear-32px">
                      <Path d="M0,0.777777778 L24.4444444,0.777777778 M0,8.55555556 L9.77777778,8.55555556 M0,16.3333333 L8.55555556,16.3333333" id="Shape"></Path>
                  </G>
                  <G id="Eye-Linear-32px" transform="translate(11.000000, 4.888889)" stroke-linejoin="round">
                      <Path d="M9.09876543,15.9652778 C12.0382609,15.9652778 14.7779039,14.093173 16.6848288,10.8529918 C17.4342752,9.58392078 17.4342752,7.45080144 16.6848288,6.18173045 C14.7779039,2.94154918 12.0382609,1.06944444 9.09876543,1.06944444 C6.15926998,1.06944444 3.41962692,2.94154918 1.51270211,6.18173045 C0.763255676,7.45080144 0.763255676,9.58392078 1.51270211,10.8529918 C3.41962692,14.093173 6.15926998,15.9652778 9.09876543,15.9652778 Z" id="Path"></Path>
                      <Path d="M11.8148148,8.51736111 C11.8148148,10.1016837 10.600938,11.3819444 9.09876543,11.3819444 C7.59659287,11.3819444 6.38271605,10.1016837 6.38271605,8.51736111 C6.38271605,6.93303849 7.59659287,5.65277778 9.09876543,5.65277778 C10.600938,5.65277778 11.8148148,6.93303849 11.8148148,8.51736111 Z" id="Path"></Path>
                  </G>
              </G>
          </G>
      </G>
    </Svg>
  )
}

export function ProfileIcon({color, size}) {
  return (
    <Svg width="18px" height="24px" viewBox="0 0 18 24" version="1.1" xmlns="http://www.w3.org/2000/Svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <G id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
          <G id="Artboard" transform="translate(-171.000000, -37.000000)" stroke={color} strokeWidth="1.5">
              <Path d="M179.93862,47.8510248 C179.822133,47.8399197 179.682348,47.8399197 179.554211,47.8510248 C176.774575,47.7610546 174.572303,45.5828939 174.580176,42.9314672 C174.580176,40.2107186 176.886649,38.0008045 179.75224,38.0008045 C181.597952,37.9690647 183.321223,38.8784567 184.272912,40.3864212 C185.224601,41.8943857 185.260125,43.7718271 184.366102,45.3115313 C183.472079,46.8512356 181.784332,47.819285 179.93862,47.8510248 L179.93862,47.8510248 Z M174.114247,51.9488053 C171.295251,53.7478309 171.295251,56.6795762 174.114247,58.4674967 C177.317652,60.5108344 182.571237,60.5108344 185.774642,58.4674967 C188.593638,56.6684711 188.593638,53.7367258 185.774642,51.9488053 C182.582885,49.9165727 177.329301,49.9165727 174.114247,51.9488053 L174.114247,51.9488053 Z" id="Shape"></Path>
          </G>
      </G>
    </Svg>
  )
}

export function SearchIcon({ color }) {
  return (
    <View style={{position: 'absolute', top: 15, left: width*0.15-40, zIndex: 2}}>
      <Svg width="17px" height="17px" viewBox="0 0 15 15" version="1.1" xmlns="http://www.w3.org/2000/Svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <G id="Page-1" stroke="none" strokeWidth="2" fill="none" fill-rule="evenodd" strokeLinecap="round" stroke-linejoin="round">
              <G id="Mobile" transform="translate(-43.000000, -60.000000)" stroke={color} stroke-width="2">
                  <G id="SearchNormal1-Linear-32px" transform="translate(44.000000, 61.000000)">
                      <Path d="M6.175,12.35 C8.38111504,12.35 10.4196494,11.1730517 11.5227069,9.26250003 C12.6257645,7.35194836 12.6257645,4.99805164 11.5227069,3.08749997 C10.4196494,1.17694831 8.38111504,0 6.175,0 C2.76464167,0 0,2.76464167 0,6.175 C0,9.58535833 2.76464167,12.35 6.175,12.35 L6.175,12.35 Z M13,13 L11.7,11.7" id="Shape"></Path>
                  </G>
              </G>
          </G>
      </Svg>
    </View>
  )
}

export function BackArrowIcon({ color }) {
  return (
    <Svg width="17px" height="17px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <G id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
            <G id="Mobile" transform="translate(-20.000000, -32.000000)" stroke={color} strokeWidth="2">
                <Path d="M27.1728,33 L33,38.8272 L27.1728,44.6544 M21,38.8272 L31.3968,38.8272" id="Shape" transform="translate(27.000000, 38.827200) scale(-1, 1) translate(-27.000000, -38.827200) "></Path>
            </G>
        </G>
    </Svg>
  )
}

export function AddIcon({ color }) {
  return (
    <Svg width="35px" height="35px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <G id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <G id="Mobile" transform="translate(-269.000000, -24.000000)">
          <G id="Group-2" transform="translate(269.000000, 24.000000)">
            <Circle id="Oval" fill="#282523" cx="15" cy="15" r="15"></Circle>
            <Rect id="Rectangle" fill="#F9E8DC" x="14" y="9" width="2" height="12" rx="1"></Rect>
            <Path d="M15,9 C15.5522847,9 16,9.44771525 16,10 L16,20 C16,20.5522847 15.5522847,21 15,21 C14.4477153,21 14,20.5522847 14,20 L14,10 C14,9.44771525 14.4477153,9 15,9 Z" id="Rectangle" fill="#F9E8DC" transform="translate(15.000000, 15.000000) rotate(90.000000) translate(-15.000000, -15.000000) "></Path>
          </G>
        </G>
      </G>
    </Svg>
  )
}