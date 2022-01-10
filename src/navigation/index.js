import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer} from '@react-navigation/native';
// import { createStackNavigator, CardStyleInterpolator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeContext } from '../context/themeContext';
import Home from '../screens/Home';
import Explore from '../screens/Explore';
import Watchlists from '../screens/Watchlists';
import Profile from '../screens/Profile';
import Search from '../components/Search';
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
        component={Watchlists}
        initialParams={{ theme }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <WatchlistIcon color={color} size={size} />
          ),
        }}        
      />
      <TabMenu.Screen
        name="Profile"
        initialParams={{ theme }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ProfileIcon color={color} size={size} />
          ),
        }} 
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
        name="SearchNav"
        component={SearchNav}
      />
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
