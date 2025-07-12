import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../contexts/ThemeContext';

import HomeScreen from '../screens/HomeScreen';
import ScannerScreen from '../screens/ScannerScreen';
import SavedScreen from '../screens/SavedScreen';
import ResultScreen from '../screens/ResultScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const commonStackOptions = (themeStyles) => ({
  headerStyle: {
    backgroundColor: themeStyles.background,
    shadowColor: 'transparent',
  },
  headerTintColor: themeStyles.text,
  headerBackTitleVisible: false,
});

const HomeStack = () => {
  const { styles: themeStyles } = useContext(ThemeContext);
  return (
    <Stack.Navigator screenOptions={commonStackOptions(themeStyles)}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Scanner" component={ScannerScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
    </Stack.Navigator>
  );
};

const SavedStack = () => {
  const { styles: themeStyles } = useContext(ThemeContext);
  return (
    <Stack.Navigator screenOptions={commonStackOptions(themeStyles)}>
      <Stack.Screen name="SavedList" component={SavedScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}

const AppNavigator = () => {
  const { styles: themeStyles } = useContext(ThemeContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'HomeStack') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'SavedStack') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: themeStyles.primary,
        tabBarInactiveTintColor: themeStyles.secondaryText,
        tabBarStyle: {
          backgroundColor: themeStyles.card,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="HomeStack" component={HomeStack} options={{ title: 'Home' }} />
      <Tab.Screen name="SavedStack" component={SavedStack} options={{ title: 'Saved' }} />
    </Tab.Navigator>
  );
};

export default AppNavigator; 