import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../contexts/ThemeContext';

import HomeScreen from '../screens/HomeScreen';
import ScannerScreen from '../screens/ScannerScreen';
import ResultScreen from '../screens/ResultScreen';
import SavedScreen from '../screens/SavedScreen';
import ContactScreen from '../screens/ContactScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const commonStackOptions = (themeStyles) => ({
  headerStyle: {
    backgroundColor: themeStyles.background,
  },
  headerTintColor: themeStyles.text,
});

const HomeStack = () => {
  const { styles: themeStyles } = useContext(ThemeContext);
  return (
    <Stack.Navigator screenOptions={commonStackOptions(themeStyles)}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Scanner" component={ScannerScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Result" component={ResultScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}

const SavedStack = () => {
  const { styles: themeStyles } = useContext(ThemeContext);
  return (
    <Stack.Navigator screenOptions={commonStackOptions(themeStyles)}>
      <Stack.Screen name="SavedList" component={SavedScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Result" component={ResultScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}

const AppNavigator = () => {
  const { styles: themeStyles } = useContext(ThemeContext);
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeStack') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'SavedStack') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          } else if (route.name === 'Contact') {
            iconName = focused ? 'mail' : 'mail-outline';
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
      <Tab.Screen name="HomeStack" component={HomeStack} options={{ title: 'Hjem', headerShown: false }} />
      <Tab.Screen name="SavedStack" component={SavedStack} options={{ title: 'Gemte', headerShown: false }} />
      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          title: 'Kontakt',
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator; 