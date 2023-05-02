import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FrontPage from './FrontPage';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Search from './Search';
import Profile from './Profile';
import Calendar from './Calendar';
import List from './List';
import Day from './Day';
import Recipes from './Recipes';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { PantallasProvider } from './PantallasContext';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  return (
    <PantallasProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FrontPage" component={FrontPage} />
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Day" component={Day} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Recipes" component={Recipes} />
        <Stack.Screen name="Home">
          {() => (
            <Tab.Navigator
              screenOptions={{ headerShown: false }}
              tabBarOptions={{
                activeTintColor: '#a9d989',
                inactiveTintColor: '#1E5B53',
                backgroundColor: 'red',
                style: {
                  backgroundColor: 'red',
                },
              }}
              initialRouteName="Calendar">
              <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="ios-person" color={color} size={size} />
                  ),
                }}
              />
              <Tab.Screen
                name="Calendar"
                component={Calendar}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="ios-calendar" color={color} size={size} />
                  ),
                }}
              />
              <Tab.Screen
                name="List"
                component={List}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="ios-list" color={color} size={size} />
                  ),
                }}
              />
            </Tab.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    </PantallasProvider>
  );
}

export default App;
