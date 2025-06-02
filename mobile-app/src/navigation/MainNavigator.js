import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '../screens/main/DashboardScreen';
import PetsScreen from '../screens/main/PetsScreen';
import MetricsScreen from '../screens/main/MetricsScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import AddPetScreen from '../screens/pets/AddPetScreen';
import PetProfileScreen from '../screens/pets/PetProfileScreen';
import PetHealthScreen from '../screens/pets/PetHealthScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const PetStack = createStackNavigator();

const PetNavigator = () => {
  return (
    <PetStack.Navigator>
      <PetStack.Screen name="PetsList" component={PetsScreen} />
      <PetStack.Screen name="AddPet" component={AddPetScreen} />
      <PetStack.Screen name="PetProfile" component={PetProfileScreen} />
      <PetStack.Screen name="PetHealth" component={PetHealthScreen} />
    </PetStack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Dashboard':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Pets':
              iconName = focused ? 'paw' : 'paw-outline';
              break;
            case 'Metrics':
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'help-circle';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Pets" component={PetNavigator} />
      <Tab.Screen name="Metrics" component={MetricsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigator; 