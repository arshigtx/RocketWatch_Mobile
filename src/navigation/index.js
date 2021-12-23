import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer} from '@react-navigation/native';
// import { createStackNavigator, CardStyleInterpolator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeContext } from '../context/themeContext';
import Home from '../screens/Home';
import Explore from '../screens/Explore';
import Watchlist from '../screens/Watchlist';
import Profile from '../screens/Profile';
import CoinDetails from '../screens/CoinDetails';
import { HomeIcon, ExploreIcon, WatchlistIcon, ProfileIcon } from '../components/Icons'

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
    <Stack.Navigator>
      <Stack.Screen name="Root" component={TabMenuNav} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const TabMenu = createBottomTabNavigator();

function TabMenuNav() {

  const { theme } = useContext(ThemeContext);

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
        // tabBarShowLabel: false 
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
        component={Explore}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ExploreIcon color={color} size={size} />
          ),
        }}
      />
      <TabMenu.Screen
        name="Watchlists"
        component={Explore}
        initialParams={{ theme }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <WatchlistIcon color={color} size={size} />
          ),
        }}        
        //   title: 'Tab Two',
        // }}
      />
      <TabMenu.Screen
        name="Profile"
        initialParams={{ theme }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ProfileIcon color={color} size={size} />
          ),
        }} 
               
        //   title: 'Tab Two',
        // }}
      >
        {props => <Profile {...props}/> }
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
        // presentation: 'modal'
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
