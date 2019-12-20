import React from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
// import NewsScreen from '../screens/NewsScreen';
// import ProductsScreen from '../screens/ProductsScreen';

import FindToolsScreen from '../screens/FindToolsScreen';
import LtpScreen from '../screens/LtpScreen';
import JobsScreen from '../screens/JobsScreen';
import BookedOutToolsScreen from '../screens/BookedOutToolsScreen';
import Colors from '../constants/Colors';
const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {}
});

// Home screen
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <Text style={focused ? styles.focused : styles.notFocused}>Home</Text>
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  )
};

HomeStack.path = '';
// End Home screen

// Find Tools screen
const FindToolsStack = createStackNavigator(
  {
    FindTools: FindToolsScreen
  },
  config
);

FindToolsStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <Text style={focused ? styles.focused : styles.notFocused}>Find Tools</Text>
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-build' : 'md-build'}
    />
  )
};

FindToolsStack.path = '';
// End Find Tools screen

// BookedOutTools screen
const BookedOutToolsStack = createStackNavigator(
  {
    BookedOutTools: BookedOutToolsScreen
  },
  config
);

BookedOutToolsStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <Text style={focused ? styles.focused : styles.notFocused}>
      Booked tools
    </Text>
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-return-left' : 'md-return-left'}
    />
  )
};

BookedOutToolsStack.path = '';
// End Return Tools screen

// Jobs screen
const JobsStack = createStackNavigator(
  {
    Jobs: JobsScreen
  },
  config
);

JobsStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <Text style={focused ? styles.focused : styles.notFocused}>Jobs</Text>
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-clipboard' : 'md-today'}
    />
  )
};

JobsStack.path = '';
// End Jobs screen

// LTP screen
const LtpStack = createStackNavigator(
  {
    Ltp: LtpScreen
  },
  config
);

LtpStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <Text style={focused ? styles.focused : styles.notFocused}>LTP</Text>
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-swap' : 'md-swap'}
    />
  )
};

LtpStack.path = '';
// End LTP screen

// Tab navigator
const tabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator({
        FindToolsStack,
        BookedOutToolsStack,
        JobsStack,
        LtpStack
      })
    : createBottomTabNavigator({
        FindToolsStack,
        BookedOutToolsStack,
        JobsStack,
        LtpStack
      });

tabNavigator.path = '';
// End Tab navigator

const styles = StyleSheet.create({
  focused: {
    color: Colors.vwgDeepBlue,
    fontSize: RFPercentage(1.7)
  },
  notFocused: {
    color: Colors.vwgIosLink,
    fontSize: RFPercentage(1.7)
  }
});

export default tabNavigator;
