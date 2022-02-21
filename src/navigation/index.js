import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolator, TransitionPresets } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux'

import Home from '../screens/Home';
import Explore from '../screens/Explore';
import Watchlists from '../screens/Watchlists';
import Settings from '../screens/Settings';
import Search from '../components/shared/Search';
import CoinDetails from '../screens/CoinDetails';
import AddCrypto from '../screens/AddCrypto';
import Currency from '../screens/Currency';

import { HomeIcon, ExploreIcon, WatchlistIcon, ProfileIcon } from '../components/core/Icons'

export default function Navigation() {
  return (
    <NavigationContainer >
      <RootNavigator />
    </NavigationContainer>
  )
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Root"
      screenOptions={{
        headerShown: false,
        presentation: 'modal'
      }}
    >
      <Stack.Screen name="Root" component={TabMenuNav} options={{ headerShown: false }} />
      <Stack.Screen name="AddCryptoNav" component={AddCryptoNav} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

const TabMenu = createBottomTabNavigator();

function TabMenuNav() {

  const { theme } = useSelector(state => state.userPreference);

  return (
    <TabMenu.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: theme.navBar.activeIcon.color,
        tabBarInactiveTintColor: theme.navBar.inactiveIcon.color,
        headerShown: false,
        tabBarStyle: {
          ...theme.navBar,
          borderTopWidth: 1,
          height: 90,
          paddingTop: 7,
          paddingBottom: 35
        },
      }}
    >
      <TabMenu.Screen
        name="Home"
        component={HomeNav}
        options={{
          tabBarIcon: ({ color, size }) => (
            <HomeIcon color={color} size={size} />
          ),
        }}
      />
      <TabMenu.Screen
        name="Explore"
        component={ExploreNav}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ExploreIcon color={color} size={size} />
          ),
        }}
      />
      <TabMenu.Screen
        name="Watchlists"
        component={WatchlistsNav}
        initialParams={{ theme }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <WatchlistIcon color={color} size={size} />
          ),
        }}        
      />
      <TabMenu.Screen
        name="Settings"
        initialParams={{ theme }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ProfileIcon color={color} size={size} />
          ),
        }} 
      >
        {props => <SettingsNav {...props}/> }
      </TabMenu.Screen>
    </TabMenu.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeNav() {
  return(
    <HomeStack.Navigator
      initialRouteName="HomeNav"
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen
        name="HomeScreen"
        options={{
          tabBarIcon: ({ color, size }) => (
            <HomeIcon color={color} size={size} />
          ),
          // cardStyleInterpolator: ({current}) => ({
          //   cardStyle: {
          //     opacity: current.progress,
          //     transform: [{scale: current.progress}]
          //   },
          // }),
        }}
      >
      {props => <Home {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="SearchNav"
        component={SearchNav}
      />
      {/* <HomeStack.Screen
        name="AddCryptoNav"
        component={AddCryptoNav}
        screenOptions={{
          headerShown: false,
          presentation: 'modal'
        }}
        options={{...TransitionPresets.ModalSlideFromBottomIOS}} 
      /> */}
      <HomeStack.Screen
        name="CoinDetails"
        options={{
          tabBarIcon: ({ color, size }) => (
            <HomeIcon color={color} size={size} />
          ),
          // cardStyle: {
          //   backgroundColor: 'red'
          // },
          // cardStyleInterpolator: 
          // ({current}) => ({
          //   cardStyle: {
          //     opacity: current.progress,
          //     backgroundColor: 'red'
          //     // transform: [{scale: current.progress}]
          //   },
          // }),
        }}
      >
      {props => <CoinDetails {...props} />}
      </HomeStack.Screen>
    </HomeStack.Navigator>
  )
} 

const ExploreStack = createNativeStackNavigator();

function ExploreNav() {
  return (
    <ExploreStack.Navigator
      initialRouteName="ExploreScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <ExploreStack.Screen
        name="ExploreScreen"
        component={Explore} 
      />
      <ExploreStack.Screen
        name="CoinDetails"
        component={CoinDetails}
      />
    </ExploreStack.Navigator>
  )
}

const SearchStack = createNativeStackNavigator();

function SearchNav() {
  return (
    <SearchStack.Navigator
      initialRouteName="Search"
      screenOptions={{
        headerShown: false,
      }}
    >
      <SearchStack.Screen
        name="Search"
        component={Search} 
      />
      <SearchStack.Screen
        name="CoinDetails"
        component={CoinDetails}
      />
    </SearchStack.Navigator>
  )
}

const AddCryptoStack = createNativeStackNavigator();

function AddCryptoNav() {
  return (
    <AddCryptoStack.Navigator
      initialRouteName="AddCrypto"
      screenOptions={{
        headerShown: false,
      }}
    >
      <AddCryptoStack.Screen
        name="AddCrypto"
        component={AddCrypto} 
      />
      <AddCryptoStack.Screen
        name="CoinDetails"
        component={CoinDetails}
      />
    </AddCryptoStack.Navigator>
  )
}

const SettingsStack = createNativeStackNavigator();

function SettingsNav() {
  return (
    <SettingsStack.Navigator
      initialRouteName="SettingsNav"
      screenOptions={{
        headerShown: false,
      }}
    >
      <SettingsStack.Screen
        name="SettingsScreen"
        component={Settings} 
      />
      <SettingsStack.Screen
        name="Currency"
        component={Currency}
      />
    </SettingsStack.Navigator>
  )
}

const WatchlistsStack = createNativeStackNavigator();

function WatchlistsNav() {
  return (
    <WatchlistsStack.Navigator
      initialRouteName="WatchlistsNav"
      screenOptions={{
        headerShown: false,
      }}
    >
      <WatchlistsStack.Screen
        name="WatchlistsScreen"
        component={Watchlists} 
      />
      <WatchlistsStack.Screen
        name="CoinDetails"
        component={CoinDetails}
      />
    </WatchlistsStack.Navigator>
  )
}

